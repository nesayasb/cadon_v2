# Company landing page — 12 November 2026

CADON now introduces its AI consulting and engineering services at `/`. The existing financial execution infrastructure page is retained at `/financial-services`, including its MCP walkthrough, developer information and financial access form. `/demo`, its access gate, API routes and ChatGPT walkthrough retain their existing URLs and implementation.

The main page introduces strategy, automation and custom AI development; expandable examples are labelled illustrative scopes. It does not identify prospective clients as customers or invent delivery metrics. A dedicated finance section connects visitors to the specialist offering.

The shared enquiry component now supports a project variant using the existing delivery endpoint and configured providers. Consulting categories are explicitly accepted by validation and generate a `CADON project enquiry` subject. The financial variant retains `CADON access request`. Email destinations and production credentials are unchanged. Both variants retain the existing error and email-draft fallback.

Navigation and the sitemap include the financial route. Each landing page has its own canonical, social metadata and generated share image. The demo gate directs financial access enquiries to the financial page.

Validation: Next production build and TypeScript, ESLint, offline MCP/chat and form checks, project enquiry delivery fixture, and built HTTP checks for both routes, internal links and fragments, metadata, assets, access gate and authenticated demo rendering. Tests mock email delivery and model calls; they do not send real emails or financial requests. The managed preview daemon passes Vite flags unsupported by this Next.js project, so local browser preview was unavailable; live visual inspection follows deployment.
