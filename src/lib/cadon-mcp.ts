import "server-only";
const DEFAULT_MCP_URL = "https://cadon-demo.fly.dev/mcp";
type JsonRpcResult = { result?: { protocolVersion?: string; structuredContent?: Record<string, unknown>; content?: Array<{type: string; text?: string}>; isError?: boolean }; error?: unknown };
function endpoint(){const url=new URL(process.env.CADON_MCP_URL||DEFAULT_MCP_URL);if(url.protocol!=="https:")throw new Error("MCP endpoint must use HTTPS");return url;}
async function rpcResponse(response:Response):Promise<JsonRpcResult>{
 if(!response.ok)throw new Error("CADON service unavailable");
 if(response.headers.get("content-type")?.includes("application/json"))return await response.json();
 const reader=response.body?.getReader();if(!reader)throw new Error("Missing MCP response");let text="";const decoder=new TextDecoder();
 try{while(true){const{done,value}=await reader.read();if(done)break;text+=decoder.decode(value,{stream:true});if(text.length>262144)throw new Error("MCP response too large");const lines=text.split(/\r?\n/);for(const line of lines.slice(0,-1)){if(line.startsWith("data:")){try{return JSON.parse(line.slice(5).trim());}catch{/* Wait for a complete JSON message. */}}}}}finally{await reader.cancel();}
 throw new Error("Invalid MCP response");
}
export async function callCadonTool(name:"get_cadon_demo_link"|"get_demo_result",args:Record<string,unknown>):Promise<Record<string,unknown>>{
 const url=endpoint();const headers:Record<string,string>={"Content-Type":"application/json",Accept:"application/json, text/event-stream",...(process.env.CADON_MCP_TOKEN?{Authorization:`Bearer ${process.env.CADON_MCP_TOKEN}`}:{})};
 const post=(body:unknown)=>fetch(url,{method:"POST",headers,body:JSON.stringify(body),cache:"no-store",redirect:"error",signal:AbortSignal.timeout(20000)});
 const init=await post({jsonrpc:"2.0",id:1,method:"initialize",params:{protocolVersion:"2025-03-26",capabilities:{},clientInfo:{name:"cadon-website",version:"1.0.0"}}});
 const session=init.headers.get("mcp-session-id");const initialized=await rpcResponse(init);if(initialized.error)throw new Error("MCP initialization failed");headers["MCP-Protocol-Version"]=initialized.result?.protocolVersion||"2025-03-26";if(session)headers["Mcp-Session-Id"]=session;
 try{
 const notified=await post({jsonrpc:"2.0",method:"notifications/initialized"});if(!notified.ok)throw new Error("MCP initialization failed");await notified.body?.cancel();
 const data=await rpcResponse(await post({jsonrpc:"2.0",id:2,method:"tools/call",params:{name,arguments:args}}));if(data.error||data.result?.isError)throw new Error("CADON tool failed");
 if(data.result?.structuredContent)return data.result.structuredContent;
 for(const item of data.result?.content||[]){if(item.type==="text"&&item.text){try{return JSON.parse(item.text);}catch{/* Prefer structured tool output; never parse display copy as a status. */}}}
 throw new Error("CADON returned no structured result");
 }finally{if(session){try{const closed=await fetch(url,{method:"DELETE",headers,signal:AbortSignal.timeout(3000)});await closed.body?.cancel();}catch{/* Transport cleanup must not discard a valid tool result. */}}}
}
export function trustedDemoUrl(value:unknown){if(typeof value!=="string")throw new Error("Missing launch URL");const url=new URL(value);if(url.protocol!=="https:"||url.origin!==endpoint().origin||!(url.pathname.startsWith("/demo/")||url.pathname.startsWith("/s/"))||url.username||url.password)throw new Error("Untrusted launch URL");return url.toString();}
