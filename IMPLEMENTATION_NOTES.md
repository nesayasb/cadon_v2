# CADON connected MCP demo handoff

## Final behavior

The website explains CADON's execution-layer positioning and showcases the actual connected MCP product. It no longer serves the old client-side banking simulator. Authenticated visitors can follow the full CADON conversation in ChatGPT or prepare a direct car-finance browser session using the real MCP service. A later explicit status check calls that service's actual result tool.

## Verified service contract

On 2 October 2026, the connected plugin listed car-finance, personal-lending, mortgage, savings, investing and transfer demo shortcuts, plus its broader customer-journey taxonomy. The endpoint `https://cadon-demo.fly.dev/mcp` initialized as CADON v1.28.1 using MCP protocol 2025-03-26. Actual tool schemas include `prepare_cadon_context`, `show_car_loan_bank_options`, `get_cadon_demo_link` and `get_demo_result`.

`get_cadon_demo_link` returns a launch reference and a `/demo/car_loan` URL. Opening it transitions to the service's `/s/…` browser session. This is a functional MCP-backed demo, with fictional providers and mock financial processing. It is not a production bank integration.

## Main changes

- `src/lib/cadon-mcp.ts`: server-only streamable HTTP MCP client and launch-URL validation.
- `/api/demo-launch`: authenticated real MCP launch preparation.
- `/api/demo-result`: authenticated real MCP status retrieval with a signed launch-reference cookie and explicit field allowlist.
- `src/lib/demo-auth.ts`: signed launch-reference helpers alongside existing website access cookies.
- `/api/demo-access`: logout clears the website access and launch-reference cookies.
- `DemoSession`: connected launch page, ChatGPT example/prompt copy, direct-browser launch, live status and clear error states.
- `ProductVisual`: actual tool-sequence walkthrough, real session capture and verified pending-result fields.
- Homepage demo and developer sections: real MCP flow, actual protocol request and supported scenario labels.
- `DemoGate`, privacy text, `.env.example`, README and this report: aligned with the separate website/MCP service boundary.
- `public/images/cadon-mcp-session.png`: actual capture of the current MCP-launched interface, not the old website chat simulation.
- Removed `private/demo-app.html`, its tracing configuration and old screenshot. Legacy demo routes redirect to the new access page.

The existing Next.js/Vercel architecture, request-access backend, website access-code validation, responsive theme, SEO and local fonts remain in place.

## Access and privacy limits

The website gate protects the website's own launch/status routes. It cannot enforce access controls on the external MCP service or invalidate its already-issued URLs. Enforce access at the MCP service if the complete environment must be private. Its source was not supplied, so it was not modified.

ChatGPT is a separate app context. Visitors need the CADON app connected to their own account and must enable it in their conversation. The website opens ChatGPT and provides a copyable example; it does not claim automatic plugin installation, invocation or a universal deep link.

The direct website flow intentionally skips chat/provider-card preflight and opens the general browser scenario. It does not create a fake conversation or make personalized financial recommendations. Safe context and provider cards in the full ChatGPT journey remain the plugin's responsibility.

The upstream service still uses a fictional environment and may display its own data-isolation/security claims. This website accurately describes the observed minimal-status contract; it does not independently certify upstream cryptographic isolation, compliance, real KYC, institution partnerships or real financial execution. Review those upstream claims separately before production use.

## Configuration and remaining inputs

Set `CADON_DEMO_ACCESS_CODE` and `CADON_DEMO_SESSION_SECRET` before website launch. The verified current MCP endpoint is the default; use `CADON_MCP_URL`/optional `CADON_MCP_TOKEN` for another deployment. Hosted values must be server-only. Configure Redis or host firewall rate limits for serverless production.

The lead enquiry receiver and complete privacy notice still require your real business/service details. No enquiry destination was invented. GitHub and cadon.io have not been updated by this handoff.

## Recommended next improvement

Capture the actual CADON provider widget inside a real ChatGPT conversation for a short product recording. Keep the fictional-provider labels visible. Then enforce invitations/authentication at the MCP service itself if the full demo must be restricted.

## Validation completed

- Production build, ESLint and TypeScript checks passed.
- Browser checks passed at 375, 768 and 1440 pixels without horizontal overflow or JavaScript errors.
- Real MCP launch returned a fresh car-loan URL. The real result tool reported `pending` / `not_opened` before opening and `pending` / `bank_selected` after choosing the fictional RiverBank provider.
- Website authentication blocked unauthenticated launch/status requests. Status before a launch returned the expected error; logout blocked further status access. Legacy routes redirected to the walkthrough.
- The real screenshot loaded in the homepage walkthrough. No terminal financial outcome or production bank operation was tested.
