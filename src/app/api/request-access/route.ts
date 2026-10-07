import {NextResponse} from "next/server";
import {ACCESS_EMAIL,accessEmailDraft} from "@/lib/access-email";
import {sameOrigin,readJson,rateAllowed} from "@/lib/request-security";
export const runtime="nodejs";
export async function POST(req:Request){
 if(!sameOrigin(req))return NextResponse.json({error:"Invalid request origin."},{status:403});
 if(!await rateAllowed(req,"leads",5))return NextResponse.json({error:"Too many requests. Please try again in 15 minutes."},{status:429,headers:{"Retry-After":"900"}});
 try{const data=await readJson(req);if(data.website)return NextResponse.json({ok:true});const{email,company,role,useCase,audience}=data;
 if(typeof email!=="string"||email.length>254||!/^\S+@\S+\.\S+$/.test(email)||typeof company!=="string"||!company.trim()||company.length>120||typeof role!=="string"||!role.trim()||role.length>100||typeof useCase!=="string"||!useCase.trim()||useCase.length>1500||!["Financial institution","AI platform or developer","Other"].includes(audience))return NextResponse.json({error:"Please check the required fields."},{status:400});
 if(process.env.RESEND_API_KEY){
  if(!process.env.CADON_ACCESS_FROM)return NextResponse.json({error:"Website email delivery needs a sender address. Please use Send request by email below."},{status:503});
  const sent=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({from:process.env.CADON_ACCESS_FROM,to:[ACCESS_EMAIL],reply_to:email.trim(),subject:"CADON access request",text:accessEmailDraft(data).body}),signal:AbortSignal.timeout(20000),redirect:"error"});
  const receipt=await sent.json();if(!sent.ok||typeof receipt.id!=="string"){console.error("cadon_access_delivery_failure",{provider:"resend",status:sent.status});throw new Error("Email provider rejected request");}
  return NextResponse.json({ok:true});
 }
 const url=process.env.CADON_ACCESS_WEBHOOK_URL || "https://formsubmit.co/ajax/nathnael.eb@outlook.com";
 const destination=new URL(url);
 if(destination.protocol!=="https:")throw new Error("HTTPS required");
 const formSubmit=destination.hostname==="formsubmit.co";
 const payload={email:email.trim(),company:company.trim(),role:role.trim(),useCase:useCase.trim(),audience,source:"cadon.io",submittedAt:new Date().toISOString(),...(formSubmit?{_subject:"CADON access request",_template:"table",_captcha:"false",_url:"https://www.cadon.io/#request-access"}:{})};
 const response=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json",...(formSubmit?{Referer:"https://www.cadon.io/",Origin:"https://www.cadon.io"}:{}),...(process.env.CADON_ACCESS_WEBHOOK_TOKEN?{Authorization:`Bearer ${process.env.CADON_ACCESS_WEBHOOK_TOKEN}`}:{})},body:JSON.stringify(payload),signal:AbortSignal.timeout(20000),redirect:"error"});
 if(!response.ok){console.error("cadon_access_delivery_failure",{provider:formSubmit?"formsubmit":"webhook",status:response.status});throw new Error("Delivery failed");}
 if(formSubmit){const result=await response.json();if(result.success!==true&&result.success!=="true"){const activation=typeof result.message==="string"&&/activat|confirm.*email/i.test(result.message);console.error("cadon_access_delivery_failure",{provider:"formsubmit",category:activation?"activation_required":"provider_rejected"});return NextResponse.json({error:activation?"Website email delivery is awaiting activation. Please use Send request by email below.":"The email service did not accept your request. Please use Send request by email below."},{status:502});}}
 return NextResponse.json({ok:true});
 }catch{console.error("cadon_access_delivery_failure",{category:"delivery_or_configuration_failure"});return NextResponse.json({error:"Website email delivery is unavailable. Please use Send request by email below."},{status:502});}
}
