import "server-only";
import {createHash} from "node:crypto";
const counters=new Map<string,{count:number;expires:number}>();
export function sameOrigin(req:Request){
 const origin=req.headers.get("origin");const host=req.headers.get("host");
 if(!origin||!host)return false;
 try{const parsed=new URL(origin);const protocol=(req.headers.get("x-forwarded-proto")?.split(",")[0].trim()||new URL(req.url).protocol.replace(":",""))+":";return parsed.host===host && parsed.protocol===protocol;}catch{return false;}
}
export async function rateAllowed(req:Request,scope:string,limit:number,seconds=900){
 // Vercel sets x-forwarded-for. Other hosts must strip untrusted forwarded headers.
 const ip=req.headers.get("x-forwarded-for")?.split(",")[0].trim()||"unknown";
 const key=`cadon:${scope}:${createHash("sha256").update(ip).digest("hex")}`;
 const url=process.env.UPSTASH_REDIS_REST_URL;const token=process.env.UPSTASH_REDIS_REST_TOKEN;
 if(url&&token){try{const r=await fetch(url,{method:"POST",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify(["EVAL","local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],ARGV[1]) end; return n",1,key,seconds]),signal:AbortSignal.timeout(5000),cache:"no-store"});if(!r.ok)return false;const data=await r.json();return typeof data.result==="number"&&data.result<=limit;}catch{return false;}}
 // Process-local fallback: suitable for development; use Redis or host WAF on serverless.
 const now=Date.now();for(const [k,v]of counters)if(v.expires<=now)counters.delete(k);
 let c=counters.get(key);if(!c){if(counters.size>=10000)return false;c={count:0,expires:now+seconds*1000};counters.set(key,c);}c.count++;return c.count<=limit;
}
export async function readJson(req:Request,maxBytes=8192){if(!req.headers.get("content-type")?.includes("application/json"))throw new Error("Invalid content type");const reader=req.body?.getReader();if(!reader)throw new Error("Missing body");let size=0;const chunks:Uint8Array[]=[];while(true){const{done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>maxBytes){await reader.cancel();throw new Error("Body too large");}chunks.push(value);}return JSON.parse(Buffer.concat(chunks).toString("utf8"));}
