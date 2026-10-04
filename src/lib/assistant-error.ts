import "server-only";

// Map provider diagnostics to fixed messages. Never expose or log raw error text,
// which can contain request content, credentials or remote server details.
export function assistantError(value: unknown, status?: number): string {
 const e=value&&typeof value==="object"?value as Record<string,unknown>:{};
 const code=typeof e.code==="string"?e.code:"";
 const type=typeof e.type==="string"?e.type:"";
 const detail=typeof e.message==="string"?e.message.slice(0,8000).toLowerCase():"";
 let category="upstream_failure";
 let message="OpenAI could not complete the response. Please try again. If this persists, check the CADON server logs.";
 if([code,type].some(v=>/insufficient_quota|billing|credit_balance|usage_limit/.test(v))){category="billing";message="OpenAI API billing or usage limits blocked this request. Check the API project’s credits and spending limits.";}
 else if(status===401||code==="invalid_api_key"){category="credentials";message="OpenAI rejected the API key. Check OPENAI_API_KEY in Vercel Production and redeploy.";}
 else if(code==="model_not_found"||code==="model_not_available"||((status===403||status===404)&&detail.includes("model"))){category="model_access";message="This OpenAI API project cannot use the configured model. Set OPENAI_MODEL to an available model that supports Responses and MCP, then redeploy.";}
 else if(/mcp|connector|tool discovery/.test(code+" "+detail)){category="mcp_connection";message="OpenAI could not connect to CADON’s MCP service. Please try again; if this persists, the CADON team needs to check the MCP endpoint.";}
 else if(status===403){category="permissions";message="OpenAI denied this request. Check the API key’s project permissions and model access.";}
 else if(status===429||code==="rate_limit_exceeded"){category="rate_limit";message="OpenAI’s request rate limit was reached. Please wait and try again.";}
 else if(code==="server_error"||code==="server_is_overloaded"||status===503){category="provider_unavailable";message="OpenAI is temporarily unable to process this request. Please try again shortly.";}
 else if(status===400){category="request_configuration";message="OpenAI rejected the assistant configuration. The CADON team needs to check the configured model and request options.";}
 console.error("cadon_assistant_failure",{category,status:status||null});
 return message;
}
