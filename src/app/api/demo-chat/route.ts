import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {COOKIE_NAME,hasDemoAccess} from "@/lib/demo-auth";
import {sameOrigin,readJson,rateAllowed} from "@/lib/request-security";
import {newChatState,openChatState,sealChatState} from "@/lib/chat-state";
import {type ChatEvent} from "@/lib/chat-types";
import {runChat,sensitive} from "@/lib/chat-runner";
export const runtime="nodejs";
export const maxDuration=120;
export async function POST(req:Request){
 if(!sameOrigin(req))return NextResponse.json({error:"Invalid request origin."},{status:403});
 if(!await hasDemoAccess())return NextResponse.json({error:"Your demo access has expired. Please sign in again."},{status:401});
 if(!process.env.OPENAI_API_KEY)return NextResponse.json({error:"Live chat is not configured yet. Add OPENAI_API_KEY to Vercel Production and redeploy."},{status:503});
 if(!await rateAllowed(req,"chat",30))return NextResponse.json({error:"Please wait before sending more messages."},{status:429});
 const globalBudget=new Request(req.url,{headers:{"x-forwarded-for":"cadon-global-chat-budget"}});
 if(!await rateAllowed(globalBudget,"chat-daily",300,86400))return NextResponse.json({error:"Today’s demo capacity has been reached. Please try again tomorrow."},{status:429});
 const session=(await cookies()).get(COOKIE_NAME)!.value;
 let state,input:string;
 try{const data=await readJson(req,32768);state=data.state?openChatState(data.state,session):newChatState(session);
 if(state.turns>=40)return NextResponse.json({error:"This conversation has reached its limit. Start a new chat."},{status:409});
 if(data.approval||state.pending.length)return NextResponse.json({error:"This chat uses an older demo connection. Start a new chat to continue without approval prompts."},{status:409});
 if(typeof data.message!=="string"||!data.message.trim()||data.message.length>3000)throw new Error();
 if(sensitive(data.message))return NextResponse.json({error:"Please remove contact, identity or account details. Use fictional, non-sensitive demo preferences only."},{status:400});
 input=data.message.trim();
 }catch{return NextResponse.json({error:"This conversation is invalid or expired. Start a new chat."},{status:400});}
 const endpoint=process.env.CADON_MCP_URL||"https://cadon-demo.fly.dev/mcp";
 try{if(new URL(endpoint).protocol!=="https:")throw new Error();}catch{return NextResponse.json({error:"CADON’s execution connection is not configured correctly."},{status:503});}
 const abort=new AbortController();const timeout=setTimeout(()=>abort.abort(),110000);const disconnect=()=>abort.abort();req.signal.addEventListener("abort",disconnect,{once:true});state.turns++;
 const stream=new ReadableStream<Uint8Array>({async start(controller){const encoder=new TextEncoder();const send=(event:ChatEvent)=>controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
 try{await runChat(state,input,endpoint,abort.signal,send);}
 catch(error){if(!req.signal.aborted)send({type:"error",message:abort.signal.aborted?"The response timed out. Please try again.":error instanceof Error?error.message:"The assistant could not finish this response."});}
 finally{clearTimeout(timeout);req.signal.removeEventListener("abort",disconnect);try{send({type:"done",state:sealChatState(state),pending:[]});controller.close();}catch{/* Client disconnected. */}}
 },cancel(){abort.abort();clearTimeout(timeout);req.signal.removeEventListener("abort",disconnect);}});
 return new Response(stream,{headers:{"Content-Type":"text/event-stream; charset=utf-8","Cache-Control":"no-store, no-transform","X-Accel-Buffering":"no"}});
}
