export const EVENT_NAMES=["homepage_demo_cta_clicked","website_demo_opened","suggested_prompt_clicked","message_submitted","mcp_invoked","capability_used","secure_execution_started","secure_execution_completed","execution_failed","chatgpt_cta_clicked"] as const;
export type DemoEvent=typeof EVENT_NAMES[number];
export function trackEvent(event:DemoEvent){void fetch("/api/demo-events",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({event}),keepalive:true}).catch(()=>{});}
