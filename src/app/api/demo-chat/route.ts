import {countEvent} from "@/lib/demo-metrics";
import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {COOKIE_NAME,hasDemoAccess} from "@/lib/demo-auth";
import {sameOrigin,readJson,rateAllowed} from "@/lib/request-security";
import {newChatState,openChatState,sealChatState} from "@/lib/chat-state";
import {CONTEXT_TOOLS,TOOL_TITLES,type ChatEvent} from "@/lib/chat-types";
import {presentTool,toolSummary} from "@/lib/chat-output";
import {CHAT_INSTRUCTIONS} from "@/lib/chat-prompt";
import {jsonEvents} from "@/lib/sse";
import {assistantError} from "@/lib/assistant-error";
export const runtime="nodejs";
export const maxDuration=120;
const sensitive=(s:string)=>/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b|\b[A-Z]{2}\d{2}(?:[ ]?[A-Z0-9]){11,30}\b|\b(?:\d[ -]?){13,19}\b/i.test(s);
export async function POST(req:Request){
 if(!sameOrigin(req))return NextResponse.json({error:"Invalid request origin."},{status:403});
 if(!await hasDemoAccess())return NextResponse.json({error:"Your demo access has expired. Please sign in again."},{status:401});
 if(!process.env.OPENAI_API_KEY)return NextResponse.json({error:"Live chat is not configured yet. Add OPENAI_API_KEY to Vercel Production and redeploy."},{status:503});
 if(!await rateAllowed(req,"chat",30))return NextResponse.json({error:"Please wait before sending more messages."},{status:429});
 const globalBudget=new Request(req.url,{headers:{"x-forwarded-for":"cadon-global-chat-budget"}});
 if(!await rateAllowed(globalBudget,"chat-daily",300,86400))return NextResponse.json({error:"Today’s demo capacity has been reached. Please try again tomorrow."},{status:429});
 const session=(await cookies()).get(COOKIE_NAME)!.value;
 let state,input:unknown,snapshot;
 try{const data=await readJson(req,32768);state=data.state?openChatState(data.state,session):newChatState(session);
 snapshot=JSON.parse(JSON.stringify(state));
 if(state.turns>=40)return NextResponse.json({error:"This conversation has reached its limit. Start a new chat."},{status:409});
 if(data.approval){const approval=data.approval;if(typeof approval.id!=="string"||typeof approval.approve!=="boolean")throw new Error();const pending=state.pending.find(p=>p.id===approval.id);if(!pending)throw new Error();const args=JSON.parse(pending.arguments);
 if(approval.approve&&(sensitive(pending.arguments)||!Object.hasOwn(TOOL_TITLES,pending.name)))return NextResponse.json({error:"This action cannot be approved. Use fictional, non-sensitive details only."},{status:400});
 if(approval.approve&&pending.name==="get_demo_result"&&(!state.launches.includes(args.launch_id)||args.session_id||(typeof args.wait_seconds!=="number"||args.wait_seconds<0||args.wait_seconds>2)))return NextResponse.json({error:"Only session results created in this conversation can be checked."},{status:400});
 input=[{type:"mcp_approval_response",approval_request_id:pending.id,approve:approval.approve}];state.pending=state.pending.filter(p=>p.id!==pending.id);
 }else{if(state.pending.length)return NextResponse.json({error:"Approve or decline the pending CADON action first."},{status:409});if(typeof data.message!=="string"||!data.message.trim()||data.message.length>3000)throw new Error();if(sensitive(data.message))return NextResponse.json({error:"Please remove contact, identity or account details. Use fictional, non-sensitive demo preferences only."},{status:400});input=data.message.trim();}
 }catch{return NextResponse.json({error:"This conversation is invalid or expired. Start a new chat."},{status:400});}
 const endpoint=process.env.CADON_MCP_URL||"https://cadon-demo.fly.dev/mcp";
 try{if(new URL(endpoint).protocol!=="https:")throw new Error();}catch{return NextResponse.json({error:"CADON’s execution connection is not configured correctly."},{status:503});}
 const abort=new AbortController();const timeout=setTimeout(()=>abort.abort(),110000);const disconnect=()=>abort.abort();req.signal.addEventListener("abort",disconnect,{once:true});state.turns++;
 const stream=new ReadableStream<Uint8Array>({async start(controller){const encoder=new TextEncoder();const send=(event:ChatEvent)=>controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));let completed=false;let created=false;let size=0;
 try{const upstream=await fetch("https://api.openai.com/v1/responses",{method:"POST",headers:{Authorization:`Bearer ${process.env.OPENAI_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({model:process.env.OPENAI_MODEL||"gpt-5.6-terra",instructions:CHAT_INSTRUCTIONS,input,...(state.responseId?{previous_response_id:state.responseId}:{}),store:true,stream:true,max_output_tokens:2500,max_tool_calls:6,parallel_tool_calls:false,reasoning:{effort:"low"},tools:[{type:"mcp",server_label:"cadon",server_description:"CADON fictional financial-service demo. Sensitive details stay in the separate execution flow.",server_url:endpoint,allowed_tools:Object.keys(TOOL_TITLES),require_approval:{never:{tool_names:CONTEXT_TOOLS}},...(process.env.CADON_MCP_TOKEN?{authorization:process.env.CADON_MCP_TOKEN}:{})}]}),cache:"no-store",signal:abort.signal});
 if(!upstream.ok||!upstream.body){let diagnostic;try{diagnostic=(await upstream.json()).error;}catch{/* No structured diagnostic. */}throw new Error(assistantError(diagnostic,upstream.status));}
 for await(const event of jsonEvents(upstream.body)){size+=JSON.stringify(event).length;if(size>2000000)throw new Error("The response exceeded the demo limit.");
 if(event.type==="response.created"){state.responseId=event.response.id;created=true;}
 if(event.type==="response.output_text.delta"||event.type==="response.refusal.delta")send({type:"text",delta:event.delta});
 if(event.type==="response.output_item.added"&&event.item.type==="mcp_call")send({type:"activity",activity:{id:event.item.id,name:event.item.name,title:TOOL_TITLES[event.item.name]||"CADON activity",status:"running"}});
 if(event.type==="response.output_item.done"){const item=event.item;
 if(item.type==="mcp_list_tools"){if(item.error)send({type:"error",message:"CADON’s execution service is temporarily unavailable. The assistant is online, but cannot execute this request right now."});else send({type:"discovery",count:item.tools?.length||0});}
 if(item.type==="mcp_approval_request"){if(state.pending.length>=3||!Object.hasOwn(TOOL_TITLES,item.name)||typeof item.arguments!=="string"||item.arguments.length>6000)throw new Error("The requested action exceeds the demo limits.");state.pending.push({id:item.id,name:item.name,arguments:item.arguments});send({type:"activity",activity:{id:item.id,name:item.name,title:TOOL_TITLES[item.name],status:"approval",summary:toolSummary(item.arguments)}});}
 if(item.type==="mcp_call"){const activity=presentTool(item,endpoint);await Promise.all([countEvent("mcp_invoked"),countEvent("capability_used",Object.hasOwn(TOOL_TITLES,item.name)?item.name:"unknown")]);if(activity.status==="error")await countEvent("execution_failed");if(["completed","success"].includes(activity.signal||""))await countEvent("secure_execution_completed");for(const launch of [activity,...(activity.offers||[])])if(launch.url&&launch.launchId&&/^[A-Za-z0-9_-]{1,120}$/.test(launch.launchId)&&!state.launches.includes(launch.launchId))state.launches.push(launch.launchId);state.launches=state.launches.slice(-24);send({type:"activity",activity});}
 }
 if(event.type==="response.completed"){state.responseId=event.response.id;completed=true;}
 if(event.type==="response.failed"||event.type==="error")throw new Error(assistantError(event.type==="response.failed"?event.response?.error:event.error||event));
 if(event.type==="response.incomplete")throw new Error("The response reached its limit. Continue in a new message.");
 }
 if(!completed)throw new Error("The response was interrupted. Please try again.");
 }catch(error){if(!created)Object.assign(state,snapshot);if(!req.signal.aborted)send({type:"error",message:abort.signal.aborted?"The response timed out. Please try again.":error instanceof Error?error.message:"The assistant could not finish this response."});}
 finally{clearTimeout(timeout);req.signal.removeEventListener("abort",disconnect);try{send({type:"done",state:sealChatState(state),pending:state.pending.map(p=>p.id)});controller.close();}catch{/* Client disconnected. */}}
 },cancel(){abort.abort();clearTimeout(timeout);req.signal.removeEventListener("abort",disconnect);}});
 return new Response(stream,{headers:{"Content-Type":"text/event-stream; charset=utf-8","Cache-Control":"no-store, no-transform","X-Accel-Buffering":"no"}});
}
