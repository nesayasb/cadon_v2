import {after} from "next/server";
import {sameOrigin,readJson,rateAllowed} from "@/lib/request-security";
import {EVENT_NAMES,type DemoEvent} from "@/lib/demo-events";
import {countEvent} from "@/lib/demo-metrics";
const browserEvents=new Set(EVENT_NAMES.filter(e=>!["mcp_invoked","capability_used","secure_execution_completed","execution_failed"].includes(e)));
export async function POST(req:Request){if(!sameOrigin(req))return new Response(null,{status:403});if(!await rateAllowed(req,"events",120))return new Response(null,{status:429});try{const {event}=await readJson(req,256);if(!browserEvents.has(event))throw new Error();after(()=>countEvent(event as DemoEvent));return new Response(null,{status:204});}catch{return new Response(null,{status:400});}}
