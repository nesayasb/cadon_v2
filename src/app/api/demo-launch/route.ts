import {NextResponse} from "next/server";
import {hasDemoAccess,LAUNCH_COOKIE,sealLaunchReference,SESSION_SECONDS} from "@/lib/demo-auth";
import {callCadonTool,trustedDemoUrl} from "@/lib/cadon-mcp";
import {sameOrigin,rateAllowed} from "@/lib/request-security";
export const runtime="nodejs";
export async function POST(req:Request){
 if(!sameOrigin(req))return NextResponse.json({error:"Invalid request origin."},{status:403});
 if(!await hasDemoAccess())return NextResponse.json({error:"Your demo access has expired. Please enter your code again."},{status:401});
 if(!await rateAllowed(req,"mcp-launch",10))return NextResponse.json({error:"Too many launches. Please try again in 15 minutes."},{status:429});
 try{const result=await callCadonTool("get_cadon_demo_link",{scenario:"car_loan",market:"BE"});const url=trustedDemoUrl(result.demo_url);if(typeof result.launch_id!=="string")throw new Error("Missing launch reference");const response=NextResponse.json({url,launchId:result.launch_id},{headers:{"Cache-Control":"private, no-store"}});response.cookies.set(LAUNCH_COOKIE,sealLaunchReference(result.launch_id),{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/",maxAge:SESSION_SECONDS});return response;}catch{return NextResponse.json({error:"CADON could not prepare the demo. Please try again."},{status:502,headers:{"Cache-Control":"no-store"}});}
}
