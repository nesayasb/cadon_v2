# CADON — two interfaces, one MCP execution layer

Next.js 16 / React 19 website. `/demo` is an access-controlled, streaming OpenAI assistant connected to the existing CADON MCP. `/demo/chatgpt` explains how to connect that same MCP inside actual ChatGPT. Financial providers and outcomes are fictional; no real applications or payments are submitted.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Set server-only `CADON_DEMO_ACCESS_CODE`, a random `CADON_DEMO_SESSION_SECRET` of at least 32 characters, and `OPENAI_API_KEY`. Optional `OPENAI_MODEL` defaults to `gpt-5.6-terra`. The live MCP default is `https://cadon-demo.fly.dev/mcp`; optional `CADON_MCP_TOKEN` stays server-only. Configure Upstash Redis REST URL/token for shared production limits and aggregate analytics. Never use NEXT_PUBLIC_ for secrets. After changes to Vercel Production variables, redeploy.

Access enquiries use the authorized FormSubmit destination nathnael.eb@outlook.com unless an HTTPS webhook override is configured. The inbox owner must activate the form service. Email delivery and website access are independent.

```sh
npm run lint
npx tsc --noEmit
npm run build
node scripts/test-chat.cjs
node scripts/verify-http.cjs
# Optional live fictional MCP contract checks:
python scripts/validate-mcp.py
```

[Technical report](docs/DEMO_IMPLEMENTATION.md) covers architecture, all discovered tools, security, both experiences, required test results and known backend defects. Full live model and ChatGPT acceptance is pending credentials/client access. Do not treat offline fixtures as end-to-end evidence. Website gating does not secure the public MCP or upstream execution URLs. OpenAI response storage is enabled for continuity; see the privacy page.
