import "server-only";
import {getCadonTools,callCadonTool} from "@/lib/cadon-mcp";
import {type ChatState} from "@/lib/chat-state";
import {TOOL_TITLES,type ChatEvent} from "@/lib/chat-types";
import {presentTool} from "@/lib/chat-output";
import {CHAT_INSTRUCTIONS} from "@/lib/chat-prompt";
import {jsonEvents} from "@/lib/sse";
import {assistantError} from "@/lib/assistant-error";
import {countEvent} from "@/lib/demo-metrics";
export const sensitive=(s:string)=>/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b|\b[A-Z]{2}\d{2}(?:[ ]?[A-Z0-9]){11,30}\b|\b(?:\d[ -]?){13,19}\b/i.test(s);
export function validateToolCall(name:string,args:Record<string,unknown>,state:ChatState){
 if(!Object.hasOwn(TOOL_TITLES,name)||sensitive(JSON.stringify(args)))throw new Error("Use supported actions and fictional, non-sensitive details only.");
 if(name==="get_demo_result"&&(!state.launches.includes(String(args.launch_id))||args.session_id||args.wait_seconds!==0))throw new Error("Only sessions created in this conversation can be checked, with wait_seconds 0.");
}
function modelResult(result:Record<string,unknown>){
 // Full structured cards go to the native UI. Keep continuation receipts small.
 if(Array.isArray(result.offers))return {scenario:result.scenario,product_name:result.product_name,offers:result.offers.slice(0,24).map(o=>({bank_id:o.bank_id,bank_name:o.bank_name,rate:o.rate})),instructions:"The website has rendered the actual provider cards. End this turn with no further text."};
 return result;
}
export async function runChat(state:ChatState,message:string,endpoint:string,signal:AbortSignal,send:(e:ChatEvent)=>void){
 const discovered=await getCadonTools(signal);
 send({type:"discovery",count:discovered.length});
 const tools=discovered.map(t=>({type:"function",name:t.name,description:t.description,parameters:t.inputSchema,strict:false}));
 let input:unknown=state.toolOutputs?.length?[...state.toolOutputs,{role:"user",content:message}]:message;
 let prepared:{name:string;args:Record<string,unknown>}|undefined;
 for(const receipt of state.toolOutputs||[]){try{const r=JSON.parse(receipt.output);if(r.ready_for_cards===true&&typeof r.next_tool==="string"&&r.next_tool_args)prepared={name:r.next_tool,args:r.next_tool_args};}catch{/* No preflight receipt. */}}
 let calls=0,size=0,tokens=0;
 for(let round=0;round<7;round++){
  const upstream=await fetch("https://api.openai.com/v1/responses",{method:"POST",headers:{Authorization:`Bearer ${process.env.OPENAI_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({model:process.env.OPENAI_MODEL||"gpt-5.6-terra",instructions:CHAT_INSTRUCTIONS,input,...(state.responseId?{previous_response_id:state.responseId}:{}),store:true,stream:true,max_output_tokens:Math.max(1,2500-tokens),parallel_tool_calls:false,reasoning:{effort:"low"},tools}),cache:"no-store",signal});
  if(!upstream.ok||!upstream.body){let diagnostic;try{diagnostic=(await upstream.json()).error;}catch{/* No structured error. */}throw new Error(assistantError(diagnostic,upstream.status));}
  const pending:Array<{id:string;call_id:string;name:string;arguments:string}>=[];let completed=false;
  for await(const event of jsonEvents(upstream.body)){
   size+=JSON.stringify(event).length;if(size>2000000)throw new Error("The response exceeded the demo limit.");
   if(event.type==="response.output_text.delta"||event.type==="response.refusal.delta")send({type:"text",delta:event.delta});
   if(event.type==="response.output_item.done"&&event.item.type==="function_call")pending.push(event.item);
   if(event.type==="response.completed"){state.responseId=event.response.id;delete state.toolOutputs;tokens+=event.response.usage?.output_tokens||0;completed=true;}
   if(event.type==="response.failed"||event.type==="error")throw new Error(assistantError(event.response?.error||event.error||event));
   if(event.type==="response.incomplete")throw new Error("The response reached its limit. Please continue in a new message.");
  }
  if(!completed)throw new Error("The response was interrupted. Please try again.");
  if(!pending.length)return;
  // Retain receipts in encrypted state if the following model request fails.
  state.toolOutputs=[];
  for(const item of pending){
   let result:Record<string,unknown>;
   try{
    if(++calls>6)throw new Error("The request reached its tool-call limit.");
    if(typeof item.arguments!=="string"||item.arguments.length>6000)throw new Error("The requested action exceeds the demo limits.");
    let args=JSON.parse(item.arguments);if(!args||typeof args!=="object"||Array.isArray(args))throw new Error("Invalid action arguments.");
    // Copy signed preflight arguments exactly; the model need not transcribe tokens.
    if(prepared?.name===item.name)args={...args,...prepared.args};
    validateToolCall(item.name,args,state);signal.throwIfAborted();
    send({type:"activity",activity:{id:item.id,name:item.name,title:TOOL_TITLES[item.name],status:"running"}});
    result=await callCadonTool(item.name,args,signal);
    if(result.ready_for_cards===true&&typeof result.next_tool==="string"&&result.next_tool_args&&typeof result.next_tool_args==="object")prepared={name:result.next_tool,args:result.next_tool_args as Record<string,unknown>};
   }catch{result={error:"CADON could not complete this action. No successful outcome was confirmed."};}
   const activity=presentTool({...item,output:result},endpoint);
   for(const launch of [activity,...(activity.offers||[])])if(launch.url&&launch.launchId&&/^[A-Za-z0-9_-]{1,120}$/.test(launch.launchId)&&!state.launches.includes(launch.launchId))state.launches.push(launch.launchId);
   state.launches=state.launches.slice(-24);send({type:"activity",activity});
   await Promise.all([countEvent("mcp_invoked"),countEvent("capability_used",Object.hasOwn(TOOL_TITLES,item.name)?item.name:"unknown")]);
   if(activity.status==="error")await countEvent("execution_failed");
   if(["completed","success"].includes(activity.signal||""))await countEvent("secure_execution_completed");
   state.toolOutputs.push({type:"function_call_output",call_id:item.call_id,output:JSON.stringify(modelResult(result))});
  }
  input=state.toolOutputs;
  if(calls>=6||tokens>=2500)throw new Error("This request reached its processing limit. Continue in a new message.");
 }
}
