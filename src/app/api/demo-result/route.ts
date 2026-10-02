import {NextResponse} from "next/server";
import {hasDemoAccess,lastLaunchReference} from "@/lib/demo-auth";
import {callCadonTool} from "@/lib/cadon-mcp";
import {sameOrigin,rateAllowed} from "@/lib/request-security";
export const runtime="nodejs";
export async function POST(req:Request){
 if(!sameOrigin(req))return NextResponse.json({error:"Invalid request origin."},{status:403});
 if(!await hasDemoAccess())return NextResponse.json({error:"Your demo access has expired. Please enter your code again."},{status:401});
 const launchId=await lastLaunchReference();if(!launchId)return NextResponse.json({error:"Launch a browser session first."},{status:409});
 if(!await rateAllowed(req,"mcp-result",60))return NextResponse.json({error:"Too many status checks. Please try again later."},{status:429});
 try{const result=await callCadonTool("get_demo_result",{launch_id:launchId,wait_seconds:0});if(typeof result.status!=="string")throw new Error("Missing status");
 // Explicit allowlist: do not relay display copy, credentials, form data or legal claims.
 const signal:Record<string,string|null>={status:result.status.slice(0,50)};for(const key of ["session_id","state","reason"]){const value=result[key];if(value===null)signal[key]=null;else if(typeof value==="string")signal[key]=value.slice(0,200);}
 return NextResponse.json({launchId,signal},{headers:{"Cache-Control":"private, no-store"}});
 }catch{return NextResponse.json({error:"The status is unavailable right now. Please try again."},{status:502,headers:{"Cache-Control":"no-store"}});}
}
