# CADON website — connected MCP walkthrough

Next.js 16 / React 19 / App Router marketing site with an access-controlled walkthrough connected to the actual CADON MCP service. The old standalone website simulator has been removed.

## Run and deploy

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Deploy through the existing Vercel / Next.js workflow. Production checks: `npm run build`, `npm run lint`, `npx tsc --noEmit`. No hosting-provider migration or live-domain deployment is included in this handoff.

## Configuration

| Variable | Purpose |
| --- | --- |
| `CADON_DEMO_ACCESS_CODE` | Shared website demo invitation code. Choose a long random value. |
| `CADON_DEMO_SESSION_SECRET` | Random secret of at least 32 characters for website access and launch-reference cookies. |
| `CADON_MCP_URL` | Defaults to verified `https://cadon-demo.fly.dev/mcp`. |
| `CADON_MCP_TOKEN` | Optional server-to-server bearer token if your MCP deployment requires one. Current demo endpoint was reachable without one. |
| `CADON_ACCESS_WEBHOOK_URL` | HTTPS receiver for access enquiries; return 2xx only after accepting the request. |
| `CADON_ACCESS_WEBHOOK_TOKEN` | Optional bearer token for the enquiry receiver. |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Recommended shared rate limits on serverless deployments. |

Never expose any secret through `NEXT_PUBLIC_`. Website access fails closed without the code and signing secret. The enquiry form reports unavailable until its receiver is configured. Complete the legal entity/contact/provider/retention disclosures before activating the enquiry form.

## What the new demo does

After access-code validation, `/demo` offers two paths:

1. **Full conversation in ChatGPT:** copy a fictional example, open ChatGPT and enable the connected CADON app. The website does not install the app or recreate its provider widget. Actual plugin order: `prepare_cadon_context`, then `show_car_loan_bank_options` only when safe context is ready.
2. **Direct browser session:** prepare a fresh launch by calling the real `get_cadon_demo_link` tool through the MCP endpoint. A second explicit click opens the returned URL, starting the upstream demo session. The user can return to the website and check status through the real `get_demo_result` tool.

The browser flow is not hardcoded into the website. Providers, forms and state belong to the connected demo service. Each launch has a fresh reference. There is no simulated website completion response.

## Integration and security

`src/lib/cadon-mcp.ts` performs MCP initialization, notification and tool calls over streamable HTTP, supporting SSE or JSON replies. Credentials remain server-only. Transport sessions are closed after requests. Errors do not fall back to the removed simulator.

`/api/demo-launch` requires authenticated website access, validates request origin, rate-limits launches, calls the MCP tool, validates the returned HTTPS URL against the configured MCP origin and signs a launch-reference cookie. `/api/demo-result` uses that signed reference rather than accepting an arbitrary ID from the browser. It returns an explicit allowlist of minimal status fields. Responses are not cached. Logout clears both website cookies.

Website cookies are HTTP-only, `SameSite=Strict`, `Secure` in production and expire in 12 hours. Rotating the access code or signing secret invalidates them. This is an invitation gate, not bank authentication.

**Important boundary:** the website gate protects its walkthrough and launch/status routes. It does not protect or revoke access to the separate MCP service, the service's demo endpoints or a URL already handed to a visitor. Ending website access does not cancel the upstream session. Add authentication/access controls in the MCP service itself if the entire demonstration must be private; that service's source is not in this repository.

The connected service still uses fictional providers and deterministic mock bank decisions. It does not submit real applications, open real accounts or move money. Use fictional data only. Its documented zero-PII status contract is not a certification of production isolation or regulatory compliance.

Rate limits use Redis atomically when configured; otherwise a bounded per-process limiter supports development. For Vercel, use Redis or host firewall rules to cover all instances. Other hosts must strip untrusted forwarded IP/protocol headers.

## Assets and retired routes

`public/images/cadon-mcp-session.png` is an actual capture of the MCP-launched car-finance session, taken 2 October 2026. It is not a fabricated ChatGPT screenshot. The public homepage shows the real image with a concise tool-sequence walkthrough. The hero explicitly labels its conversation as an example.

`/demo/runtime` and `/demo-app.html` redirect to `/demo`. `private/demo-app.html`, its output-tracing configuration and the old simulator screenshot were removed. No iframe serves the obsolete application.

See `IMPLEMENTATION_NOTES.md` for changes, verification and remaining review items.
