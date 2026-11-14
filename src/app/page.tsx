import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, FileText, GitBranch, MessagesSquare, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RequestAccess from "@/components/RequestAccess";
import styles from "./home.module.css";

type Service = { title: string; description: string; deliverable: string; id?: string; href?: string };
const services: Service[] = [
  { title: "Data & Analytics", description: "Make your data reliable, accessible and useful. We connect sources, build data pipelines and create reporting that helps your team understand performance and make informed decisions.", deliverable: "Data engineering · Business intelligence · Dashboards · Data quality" },
  { title: "AI & Automation", description: "Put artificial intelligence to work on the processes that matter. We develop assistants, predictive models and automated workflows around your information, tools and approval requirements.", deliverable: "Generative AI · Machine learning · AI assistants · Process automation" },
  { title: "Digital & IT Solutions", description: "Build and connect the systems your business needs. From websites and customer portals to internal applications and CRM integrations, we turn operational requirements into practical software.", deliverable: "Web applications · CRM solutions · APIs · System integration" },
  { title: "Strategy & Transformation", description: "Decide where technology can make a meaningful difference. We assess your starting point, prioritise opportunities and shape a roadmap that connects business goals, data, AI and IT delivery.", deliverable: "Digital roadmaps · Data & AI strategy · Solution architecture · Team adoption" },
  { title: "Financial Services", id: "financial-services", description: "Help banks, lenders, insurers and fintechs bring their services into AI channels. Our financial technology offering connects assistants to controlled workflows, with sensitive steps handled in a dedicated session.", deliverable: "Financial workflow integration · MCP connectivity · Controlled execution", href: "/financial-services" },
];
const examples = [
  { title: "Customer conversations", tag: "SERVICE & SALES", text: "An assistant that answers recurring questions from approved materials, captures enquiries and hands complex requests to your team.", scope: "Website or messaging assistant · Knowledge sources · Staff handoff" },
  { title: "Everyday operations", tag: "INTERNAL WORKFLOWS", text: "A connected workflow that organises incoming requests, prepares CRM updates and routes tasks for review.", scope: "CRM integration · Document processing · Approval steps" },
  { title: "Leasing & finance journeys", tag: "SPECIALIST WORKFLOWS", text: "A guided journey that explains products, collects an initial request and hands the customer over to your controlled application process.", scope: "Product knowledge · Request routing · Secure handoff" },
  { title: "Reporting & decisions", tag: "DATA & ANALYTICS", text: "A reporting solution that brings information from different systems into a consistent view of sales, operations or service performance.", scope: "Data pipelines · Business dashboards · Performance indicators" },
];

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navbar />
    <main id="main" className={styles.home}>
      <section className={`container ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <div className="eyebrow"><span className="tiny-cross" aria-hidden="true">+</span> DATA, AI & IT CONSULTING</div>
          <h1>Data. AI. IT.<br /><span>Built around<br />your business.</span></h1>
          <p className={styles.intro}>Your partner in digital transformation.</p>
          <p className={styles.description}>We help companies turn data, artificial intelligence and technology into better decisions, connected operations and useful digital products. From strategy to hands-on implementation.</p>
          <div className={styles.actions}>
            <a className="button" href="#request-access">Discuss your project <ArrowUpRight size={17} aria-hidden="true" /></a>
            <a className={styles.quietLink} href="#services">Explore our services <ArrowDown size={15} aria-hidden="true" /></a>
          </div>
        </div>
        <figure className={styles.workflow} aria-labelledby="workflow-caption">
          <figcaption id="workflow-caption" className={styles.workflowHeading}><span>DATA, AI & SYSTEMS IN PRACTICE</span><span>ILLUSTRATIVE EXAMPLE</span></figcaption>
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
        <div className={styles.sectionHeading}><div><div className="eyebrow">01 / WHAT WE DO</div><h2>Your business first.<br />The technology follows.</h2></div><p>We bring advisory and technical delivery together across five service areas. Start with a specific challenge or build a wider roadmap for your business.</p></div>
        <div className={styles.services}>{services.map((service, i) => <article key={service.title} id={service.id} className={styles.service}><span className={styles.index}>0{i + 1}</span><h3>{service.title}</h3><div><p>{service.description}</p><p className={styles.deliverable}>{service.deliverable}</p>{service.href && <Link className={styles.serviceLink} href={service.href}>Explore financial services <ArrowUpRight size={15} aria-hidden="true" /></Link>}</div></article>)}</div>
      </section>

      <section className={styles.examplesSection} id="use-cases"><div className="container">
        <div className={styles.sectionHeading}><div><div className="eyebrow">02 / TECHNOLOGY IN PRACTICE</div><h2>Start with real work.</h2></div><p>Practical starting points across teams and industries. Each solution is scoped to your systems, users and requirements.</p></div>
        <div className={styles.examples}>{examples.map((example, i) => <details key={example.title} className={styles.example} open={i === 0}><summary><span className={styles.exampleTag}>{example.tag}</span><h3>{example.title}</h3><span className={styles.expand} aria-hidden="true">+</span></summary><div className={styles.exampleBody}><p>{example.text}</p><span>{example.scope}</span></div></details>)}</div>
        <p className={styles.exampleDisclaimer}>Illustrative project scopes. We define the implementation and success criteria together.</p>
      </div></section>

      <section className={`container ${styles.integrationSection}`}>
        <div className={styles.integrationPanel}>
          <div className={styles.integrationCopy}><div className="eyebrow">ONE CONNECTED APPROACH</div><h2>Strategy and delivery.<br /><span>Working together.</span></h2><p>A useful AI solution needs the right data. A digital product needs systems that connect. We work across these layers to turn individual projects into tools your business can use every day.</p><a href="#request-access" className={styles.integrationLink}>Plan your next project <ArrowUpRight size={19} aria-hidden="true" /></a></div>
          <div className={styles.integrationDiagram} role="img" aria-label="Data foundations, AI applications and IT systems working together"><div>Data foundations<span>Sources · Quality · Reporting</span></div><span className={styles.integrationConnector} aria-hidden="true" /><div className={styles.integrationCore}>AI applications<span>Assistants · Prediction · Automation</span></div><span className={styles.integrationConnector} aria-hidden="true" /><div>IT & business systems<span>Applications · APIs · Integrations</span></div><p>Aligned with your goals, processes and team.</p></div>
        </div>
      </section>

      <section id="approach" className={`container ${styles.section} ${styles.approach}`}>
        <div className={styles.sectionHeading}><div><div className="eyebrow">03 / HOW WE WORK</div><h2>Start focused.<br />Build with purpose.</h2></div><p>A clear business objective, the right technical foundations and a path into your everyday operations.</p></div>
        <ol className={styles.steps}>{[
          ["Understand your business", "Map the current process, the people involved and the constraints. Agree on what a successful outcome looks like.", "A clear problem & project scope"],
          ["Prove the use case", "Design the solution and test a focused first version. Validate the data, workflow and technical choices with your team before expanding it.", "A working pilot & evaluation"],
          ["Integrate & adopt", "Connect the solution to the agreed systems, document how it works and help your team use and maintain it.", "Implementation & team handover"],
        ].map(([title, text, output], i) => <li key={title}><span className={styles.stepNumber}>0{i + 1}</span><h3>{title}</h3><p>{text}</p><span className={styles.stepOutput}>{output}</span></li>)}</ol>
      </section>

      <section className={styles.contactSection} id="request-access"><div className={`container ${styles.contactGrid}`}>
        <div><div className="eyebrow">LET’S FIND YOUR STARTING POINT</div><h2>What could work<br />better in your business?</h2><p>Tell us what your team is trying to achieve. We’ll start with the problem and explore a practical next step together.</p><ul className={styles.contactPoints}><li>No technical brief needed</li><li>One project or a wider transformation roadmap</li><li>A direct conversation with the team</li></ul><div className={styles.contactFinance}>Exploring our financial services offering?<br /><Link href="/financial-services#request-access">Request financial infrastructure access <ArrowUpRight size={14} aria-hidden="true" /></Link></div></div>
        <RequestAccess variant="project" />
      </div></section>
    </main>
    <Footer />
  </>;
}
