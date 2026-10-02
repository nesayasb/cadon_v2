import {NextResponse} from "next/server";
import {authConfigured,LAUNCH_COOKIE,COOKIE_NAME,createSession,SESSION_SECONDS,validAccessCode} from "@/lib/demo-auth";
import {sameOrigin,readJson,rateAllowed} from "@/lib/request-security";
export const runtime="nodejs";
export async function POST(req:Request){
 if(!sameOrigin(req))return NextResponse.json({error:"Invalid request origin."},{status:403});
 if(!authConfigured())return NextResponse.json({error:"Demo access is not configured yet. Please request access."},{status:503});
 if(!await rateAllowed(req,"demo",8))return NextResponse.json({error:"Too many attempts. Please try again in 15 minutes."},{status:429,headers:{"Retry-After":"900"}});
 try{const data=await readJson(req);if(typeof data.code!=="string"||data.code.length>256||!validAccessCode(data.code))return NextResponse.json({error:"That access code is not valid. Please try again."},{status:401});const r=NextResponse.json({ok:true},{headers:{"Cache-Control":"no-store"}});r.cookies.set(COOKIE_NAME,createSession(),{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/",maxAge:SESSION_SECONDS});return r;}catch{return NextResponse.json({error:"Please enter a valid access code."},{status:400});}
}
export async function DELETE(req:Request){if(!sameOrigin(req))return NextResponse.json({error:"Invalid request origin."},{status:403});const r=NextResponse.json({ok:true});r.cookies.set(COOKIE_NAME,"",{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/",maxAge:0});r.cookies.set(LAUNCH_COOKIE,"",{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/",maxAge:0});return r;}
