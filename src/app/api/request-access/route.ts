import {NextResponse} from "next/server";
import {sameOrigin,readJson,rateAllowed} from "@/lib/request-security";
export const runtime="nodejs";
export async function POST(req:Request){
 if(!sameOrigin(req))return NextResponse.json({error:"Invalid request origin."},{status:403});
 if(!await rateAllowed(req,"leads",5))return NextResponse.json({error:"Too many requests. Please try again in 15 minutes."},{status:429,headers:{"Retry-After":"900"}});
 try{const data=await readJson(req);if(data.website)return NextResponse.json({ok:true});const{email,company,role,useCase,audience}=data;
 if(typeof email!=="string"||email.length>254||!/^\S+@\S+\.\S+$/.test(email)||typeof company!=="string"||!company.trim()||company.length>120||typeof role!=="string"||!role.trim()||role.length>100||typeof useCase!=="string"||!useCase.trim()||useCase.length>1500||!["Financial institution","AI platform or developer","Other"].includes(audience))return NextResponse.json({error:"Please check the required fields."},{status:400});
 const url=process.env.CADON_ACCESS_WEBHOOK_URL || "https://formsubmit.co/ajax/nathnael.eb@outlook.com";
 const destination=new URL(url);
 if(destination.protocol!=="https:")throw new Error("HTTPS required");
 const formSubmit=destination.hostname==="formsubmit.co";
 const payload={email:email.trim(),company:company.trim(),role:role.trim(),useCase:useCase.trim(),audience,source:"cadon.io",submittedAt:new Date().toISOString(),...(formSubmit?{_subject:"CADON access request",_template:"table",_captcha:"false",_url:"https://www.cadon.io/#request-access"}:{})};
 const response=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json",...(process.env.CADON_ACCESS_WEBHOOK_TOKEN?{Authorization:`Bearer ${process.env.CADON_ACCESS_WEBHOOK_TOKEN}`}:{})},body:JSON.stringify(payload),signal:AbortSignal.timeout(8000),redirect:"error"});
 if(!response.ok)throw new Error("Delivery failed");
 if(formSubmit){const result=await response.json();if(result.success!==true&&result.success!=="true")return NextResponse.json({error:"We couldn’t deliver your request yet. Please email nathnael.eb@outlook.com directly."},{status:502});}
 return NextResponse.json({ok:true});
 }catch{return NextResponse.json({error:"We couldn’t send your request. Please try again."},{status:502});}
}
