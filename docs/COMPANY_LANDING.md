# Company landing page — 12 November 2026

CADON now introduces its AI consulting and engineering services at `/`. The existing financial execution infrastructure page is retained at `/financial-services`, including its MCP walkthrough, developer information and financial access form. `/demo`, its access gate, API routes and ChatGPT walkthrough retain their existing URLs and implementation.

The main page introduces strategy, automation and custom AI development; expandable examples are labelled illustrative scopes. It does not identify prospective clients as customers or invent delivery metrics. A dedicated finance section connects visitors to the specialist offering.

The shared enquiry component now supports a project variant using the existing delivery endpoint and configured providers. Consulting categories are explicitly accepted by validation and generate a `CADON project enquiry` subject. The financial variant retains `CADON access request`. Email destinations and production credentials are unchanged. Both variants retain the existing error and email-draft fallback.

Navigation and the sitemap include the financial route. Each landing page has its own canonical, social metadata and generated share image. The demo gate directs financial access enquiries to the financial page.

Validation: Next production build and TypeScript, ESLint, offline MCP/chat and form checks, project enquiry delivery fixture, and built HTTP checks for both routes, internal links and fragments, metadata, assets, access gate and authenticated demo rendering. Tests mock email delivery and model calls; they do not send real emails or financial requests. The managed preview daemon passes Vite flags unsupported by this Next.js project, so local browser preview was unavailable; live visual inspection follows deployment.


## Broader service positioning — 14 November 2026

The company landing page now covers Data & Analytics, AI & Automation, Digital & IT Solutions, Strategy & Transformation, and Financial Services. Financial Services is listed within the same services section and links to the existing dedicated page. The previously separate finance promotion is replaced with an explanation of how data foundations, AI applications and IT systems fit together. The existing financial page and demo implementation are unchanged.

Content takes inspiration from the advisory-plus-delivery breadth of https://www.multiplai.de/ and its data/AI and IT strategy pages; CADON copy is original and does not adopt their client references, team credentials or results. The project enquiry categories cover the wider offer; earlier category values remain accepted for already-open forms. Metadata, social preview and footer reflect the new positioning.


## Visual layout — 14 November 2026

The company page adopts a dark, full-width hero with an original SVG network illustration, a mission section, three working principles and an equal-weight grid for all five offerings. The overall composition takes inspiration from MultiplAI; no reference-site assets, customer logos or credentials are reused. CADON retains its blue brand colour. The layout scales from three service columns to two and then one.

Decorative section, service, process and walkthrough-tab numbering is removed from the company and financial marketing pages. Ordered connection instructions and numeric values in technical examples retain their meaning. Demo execution, authentication and email delivery configuration are unchanged.
