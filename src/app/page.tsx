import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, FileText, GitBranch, MessagesSquare, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RequestAccess from "@/components/RequestAccess";
import styles from "./home.module.css";

const services = [
  { title: "Find your starting point.", description: "Turn a broad ambition into a practical AI roadmap. We review your workflows, data and systems, then prioritise a use case with a clear business outcome.", deliverable: "Opportunity assessment · Workflow mapping · Pilot scope" },
  { title: "Connect. Automate. Simplify.", description: "Give your team time back by connecting the tools you already use. We design workflows that move information, prepare responses and route work to the right person.", deliverable: "Process automation · System integrations · Human approvals" },
  { title: "Build AI into your business.", description: "Create assistants and applications around your knowledge and processes. From a customer-facing assistant to an internal tool, we take the solution from prototype to implementation.", deliverable: "Knowledge assistants · Custom applications · Agent integrations" },
];
const examples = [
  { title: "Customer conversations", tag: "SERVICE & SALES", text: "An assistant that answers recurring questions from approved materials, captures enquiries and hands complex requests to your team.", scope: "Website or messaging assistant · Knowledge sources · Staff handoff" },
  { title: "Everyday operations", tag: "INTERNAL WORKFLOWS", text: "A connected workflow that organises incoming requests, prepares CRM updates and routes tasks for review.", scope: "CRM integration · Document processing · Approval steps" },
  { title: "Leasing & finance journeys", tag: "SPECIALIST WORKFLOWS", text: "A guided journey that explains products, collects an initial request and hands the customer over to your controlled application process.", scope: "Product knowledge · Request routing · Secure handoff" },
  { title: "Company knowledge", tag: "TEAM PRODUCTIVITY", text: "An internal assistant that helps staff find answers across procedures and documents, with source references and access rules.", scope: "Knowledge search · Referenced answers · Access controls" },
];

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navbar />
    <main id="main" className={styles.home}>
      <section className={`container ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <div className="eyebrow"><span className="tiny-cross" aria-hidden="true">+</span> AI CONSULTING & ENGINEERING</div>
          <h1>Put AI to work.<br /><span>Across your business.</span></h1>
          <p className={styles.intro}>From the first opportunity to a working solution.</p>
          <p className={styles.description}>We help companies turn AI into useful tools, connected systems and better ways of working. Strategy, automation and custom development, built around your business.</p>
          <div className={styles.actions}>
            <a className="button" href="#request-access">Discuss your project <ArrowUpRight size={17} aria-hidden="true" /></a>
            <a className={styles.quietLink} href="#services">Explore our services <ArrowDown size={15} aria-hidden="true" /></a>
          </div>
        </div>
        <figure className={styles.workflow} aria-labelledby="workflow-caption">
          <figcaption id="workflow-caption" className={styles.workflowHeading}><span>AI, INSIDE THE WORKFLOW</span><span>ILLUSTRATIVE EXAMPLE</span></figcaption>
          <div className={styles.workflowInput}><MessagesSquare size={19} aria-hidden="true" /><div><small>01 / CUSTOMER REQUEST</small><p>“Can you explain your services?”</p></div></div>
          <div className={styles.connector} aria-hidden="true" />
          <div className={styles.workflowCore}><span className={styles.coreMark} aria-hidden="true">c</span><div><strong>Connected intelligence.</strong><span>Your knowledge. Your systems. Your rules.</span></div></div>
          <div className={styles.workflowBranches}><div><FileText size={17} aria-hidden="true" /><span>Approved knowledge</span></div><div><GitBranch size={17} aria-hidden="true" /><span>Business systems</span></div></div>
          <div className={styles.connector} aria-hidden="true" />
          <div className={styles.workflowOutput}><span className={styles.reviewMark}><Check size={18} aria-hidden="true" /></span><div><strong>A useful next step.</strong><span>Prepare an answer. Route to your team.</span></div><span className={styles.reviewLabel}>HUMAN REVIEW</span></div>
          <p className={styles.workflowNote}><ShieldCheck size={14} aria-hidden="true" /> Designed around your data and approval requirements.</p>
        </figure>
      </section>

      <div className={`container ${styles.positioning}`}><p>One partner.<br /><strong>From strategy to implementation.</strong></p><div><span>Understand</span><ArrowRight size={16} aria-hidden="true" /><span>Build</span><ArrowRight size={16} aria-hidden="true" /><span>Integrate</span><ArrowRight size={16} aria-hidden="true" /><span>Improve</span></div></div>

      <section id="services" className={`container ${styles.section}`}>
        <div className={styles.sectionHeading}><div><div className="eyebrow">01 / WHAT WE DO</div><h2>Your business first.<br />The technology follows.</h2></div><p>You don’t need a finished AI plan to get started. Bring us a process, a bottleneck or an idea. We’ll work out what is useful, feasible and worth building.</p></div>
        <div className={styles.services}>{services.map((service, i) => <article key={service.title} className={styles.service}><span className={styles.index}>0{i + 1}</span><h3>{service.title}</h3><div><p>{service.description}</p><p className={styles.deliverable}>{service.deliverable}</p></div></article>)}</div>
      </section>

      <section className={styles.examplesSection} id="use-cases"><div className="container">
        <div className={styles.sectionHeading}><div><div className="eyebrow">02 / WHERE AI CAN HELP</div><h2>Start with real work.</h2></div><p>Practical starting points across teams and industries. Each solution is scoped to your systems, users and requirements.</p></div>
        <div className={styles.examples}>{examples.map((example, i) => <details key={example.title} className={styles.example} open={i === 0}><summary><span className={styles.exampleTag}>{example.tag}</span><h3>{example.title}</h3><span className={styles.expand} aria-hidden="true">+</span></summary><div className={styles.exampleBody}><p>{example.text}</p><span>{example.scope}</span></div></details>)}</div>
        <p className={styles.exampleDisclaimer}>Illustrative project scopes. We define the implementation and success criteria together.</p>
      </div></section>

      <section className={`container ${styles.financeSection}`} id="financial-services">
        <div className={styles.financePanel}>
          <div className={styles.financeCopy}><div className="eyebrow">A SPECIALISED PART OF CADON</div><h2>Financial services.<br /><span>Executable from AI.</span></h2><p>Alongside our consulting work, we’re developing infrastructure that connects AI assistants to controlled financial workflows. Sensitive steps happen in a dedicated session, with the institution in control.</p><Link href="/financial-services" className={styles.financeLink}>Explore financial services <ArrowUpRight size={19} aria-hidden="true" /></Link><Link href="/demo" className={styles.financeDemo}>Try the connected MCP demo <ArrowRight size={15} aria-hidden="true" /></Link></div>
          <div className={styles.financeDiagram} role="img" aria-label="AI assistant connects through CADON to a controlled financial workflow"><div>AI assistant<span>Conversation & intent</span></div><span className={styles.financeConnector} aria-hidden="true" /><div className={styles.financeCore}>cadon.<span>Controlled handoff</span></div><span className={styles.financeConnector} aria-hidden="true" /><div>Financial institution<span>Identity · Consent · Execution</span></div><p>Connected prototype. Fictional providers and outcomes.</p></div>
        </div>
      </section>

      <section id="approach" className={`container ${styles.section} ${styles.approach}`}>
        <div className={styles.sectionHeading}><div><div className="eyebrow">03 / HOW WE WORK</div><h2>Start focused.<br />Build with purpose.</h2></div><p>A clear problem, a testable first version and a path into your everyday operations.</p></div>
        <ol className={styles.steps}>{[
          ["Understand your business", "Map the current process, the people involved and the constraints. Agree on what a successful outcome looks like.", "A clear problem & project scope"],
          ["Prove the use case", "Build a focused prototype using representative information. Test the workflow with your team before expanding it.", "A working pilot & evaluation"],
          ["Integrate & adopt", "Connect the solution to the agreed systems, document how it works and help your team use and maintain it.", "Implementation & team handover"],
        ].map(([title, text, output], i) => <li key={title}><span className={styles.stepNumber}>0{i + 1}</span><h3>{title}</h3><p>{text}</p><span className={styles.stepOutput}>{output}</span></li>)}</ol>
      </section>

      <section className={styles.contactSection} id="request-access"><div className={`container ${styles.contactGrid}`}>
        <div><div className="eyebrow">LET’S FIND YOUR STARTING POINT</div><h2>What could work<br />better in your business?</h2><p>Tell us what your team is trying to achieve. We’ll start with the problem and explore a practical next step together.</p><ul className={styles.contactPoints}><li>No technical brief needed</li><li>One process or a wider AI roadmap</li><li>A direct conversation with the team</li></ul><div className={styles.contactFinance}>Looking for the financial services prototype?<br /><Link href="/financial-services#request-access">Request financial infrastructure access <ArrowUpRight size={14} aria-hidden="true" /></Link></div></div>
        <RequestAccess variant="project" />
      </div></section>
    </main>
    <Footer />
  </>;
}
