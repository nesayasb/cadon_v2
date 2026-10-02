import "server-only";
import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
export const COOKIE_NAME="cadon_demo_session";
export const SESSION_SECONDS=12*60*60;
export function authConfigured(){return !!process.env.CADON_DEMO_ACCESS_CODE && (process.env.CADON_DEMO_SESSION_SECRET?.length ?? 0)>=32;}
function digest(value:string){return createHash("sha256").update(value).digest();}
export function validAccessCode(code:string){return authConfigured()&&timingSafeEqual(digest(code),digest(process.env.CADON_DEMO_ACCESS_CODE!));}
function sign(payload:string){return createHmac("sha256",process.env.CADON_DEMO_SESSION_SECRET!).update(payload+":"+digest(process.env.CADON_DEMO_ACCESS_CODE!).toString("hex")).digest("hex");}
export function createSession(){const payload=`${Math.floor(Date.now()/1000)+SESSION_SECONDS}.${randomBytes(16).toString("hex")}`;return `${payload}.${sign(payload)}`;}
export function verifySession(token?:string){if(!authConfigured()||!token||token.length>200)return false;const [expiry,nonce,signature,...extra]=token.split(".");if(extra.length||!/^\d+$/.test(expiry)||!/^[a-f0-9]{32}$/.test(nonce||"")||!/^[a-f0-9]{64}$/.test(signature||""))return false;const now=Math.floor(Date.now()/1000);if(Number(expiry)<=now||Number(expiry)>now+SESSION_SECONDS)return false;return timingSafeEqual(Buffer.from(signature,"hex"),Buffer.from(sign(`${expiry}.${nonce}`),"hex"));}
export async function hasDemoAccess(){return verifySession((await cookies()).get(COOKIE_NAME)?.value);}
export const LAUNCH_COOKIE="cadon_mcp_launch";
export function sealLaunchReference(id:string){if(!/^[A-Za-z0-9_-]{1,120}$/.test(id))throw new Error("Invalid launch reference");const payload=`${Math.floor(Date.now()/1000)+SESSION_SECONDS}.${Buffer.from(id).toString("base64url")}`;return `${payload}.${sign(payload)}`;}
export async function lastLaunchReference(){const token=(await cookies()).get(LAUNCH_COOKIE)?.value;if(!authConfigured()||!token||token.length>350)return null;const[expiry,id,signature,...extra]=token.split(".");const now=Math.floor(Date.now()/1000);if(extra.length||!/^\d+$/.test(expiry)||Number(expiry)<=now||Number(expiry)>now+SESSION_SECONDS||!/^[A-Za-z0-9_-]+$/.test(id||"")||!/^[a-f0-9]{64}$/.test(signature||""))return null;if(!timingSafeEqual(Buffer.from(signature,"hex"),Buffer.from(sign(`${expiry}.${id}`),"hex")))return null;const decoded=Buffer.from(id,"base64url").toString();return /^[A-Za-z0-9_-]{1,120}$/.test(decoded)?decoded:null;}
