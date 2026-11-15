import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Database, BrainCircuit, PanelsTopLeft, Compass, Landmark, Layers, Users, Waypoints } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {OFFERINGS} from "@/lib/offerings";
import NetworkBackdrop from "@/components/NetworkBackdrop";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RequestAccess from "@/components/RequestAccess";
import styles from "./home.module.css";

const offeringIcons:Record<string,LucideIcon>={"data-analytics":Database,"ai-automation":BrainCircuit,"digital-it":PanelsTopLeft,"strategy-transformation":Compass,"financial-services":Landmark};
const services=OFFERINGS.map(offering=>({...offering,icon:offeringIcons[offering.slug]}));
const examples = [
  { title: "Customer conversations", tag: "SERVICE & SALES", text: "An assistant that answers recurring questions from approved materials, captures enquiries and hands complex requests to your team.", scope: "Website or messaging assistant · Knowledge sources · Staff handoff" },
  { title: "Everyday operations", tag: "INTERNAL WORKFLOWS", text: "A connected workflow that organises incoming requests, prepares CRM updates and routes tasks for review.", scope: "CRM integration · Document processing · Approval steps" },
  { title: "Leasing & finance journeys", tag: "SPECIALIST WORKFLOWS", text: "A guided journey that explains products, collects an initial request and hands the customer over to your controlled application process.", scope: "Product knowledge · Request routing · Secure handoff" },
  { title: "Reporting & decisions", tag: "DATA & ANALYTICS", text: "A reporting solution that brings information from different systems into a consistent view of sales, operations or service performance.", scope: "Data pipelines · Business dashboards · Performance indicators" },
];

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navbar dark />
    <main id="main" className={styles.home}>
      <section className={styles.hero}>
        <NetworkBackdrop />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>DATA, AI & IT CONSULTING</div>
            <h1>Data, AI & IT<br /><span>Built around<br />your business</span></h1>
            <p>Your partner in digital transformation.<br />From strategy to hands-on implementation.</p>
            <div className={styles.actions}><a className={`button ${styles.heroCta}`} href="#request-access">Discuss your project <ArrowUpRight size={17} aria-hidden="true" /></a><a className={styles.quietLink} href="#services">Explore our services <ArrowDown size={16} aria-hidden="true" /></a></div>
          </div>
          <div className={styles.heroCaption}><span>DATA</span><span>INTELLIGENCE</span><span>CONNECTION</span></div>
        </div>
      </section>

      <section id="about" className={`container ${styles.mission}`}>
        <div className={styles.eyebrow}>OUR MISSION</div>
        <h2>Turn digital ambition<br />into <span>everyday progress</span></h2>
        <p>We help companies turn data, artificial intelligence and technology into better decisions, connected operations and useful digital products. We bring business understanding and technical delivery together, from the first question to the solution your team uses.</p>
        <div className={styles.principles}>
          <article><Compass size={29} aria-hidden="true" /><h3>Business-led</h3><p>Start with the outcome you need. Choose the technology that serves it.</p></article>
          <article><Users size={29} aria-hidden="true" /><h3>Built together</h3><p>Work with your team to test ideas, refine the solution and support adoption.</p></article>
          <article><Waypoints size={29} aria-hidden="true" /><h3>Connected by design</h3><p>Bring data, applications and workflows together around your operations.</p></article>
        </div>
      </section>

      <section id="services" className={styles.offerings}>
        <div className="container">
          <div className={styles.sectionHeading}><div><div className={styles.eyebrow}>OUR CORE OFFERINGS</div><h2>Your business first<br /><span>The technology follows</span></h2></div><p>Advisory and technical delivery across five service areas. Start with a specific challenge or build a wider roadmap for your business.</p></div>
          <div className={styles.services}>{services.map(service => <article key={service.title} id={service.slug} className={styles.service}>
            <div className={styles.serviceArt} aria-hidden="true"><div className={styles.artOrbit} /><service.icon size={62} strokeWidth={1.15} /></div>
            <div className={styles.serviceBody}><h3>{service.title}</h3><p>{service.description}</p><p className={styles.deliverable}>{service.deliverable}</p><Link className={styles.serviceLink} href={service.href || "#request-access"}>{service.slug === "financial-services" ? "Explore financial services" : "Explore this service"}<ArrowUpRight size={16} aria-hidden="true" /></Link></div>
          </article>)}<div className={styles.serviceInvitation}><Layers size={32} aria-hidden="true" /><div className={styles.eyebrow}>LET’S FIND YOUR STARTING POINT</div><h3>A challenge<br />An idea<br /><span>A next step</span></h3><p>You don’t need a technical brief. Tell us what could work better in your business.</p><a href="#request-access">Start a conversation <ArrowRight size={18} aria-hidden="true" /></a></div></div>
        </div>
      </section>

      <section className={styles.examplesSection} id="use-cases"><div className="container">
        <div className={styles.sectionHeading}><div><div className={styles.eyebrow}>TECHNOLOGY IN PRACTICE</div><h2>Start with real work</h2></div><p>Practical starting points across teams and industries. Each solution is scoped to your systems, users and requirements.</p></div>
        <div className={styles.examples}>{examples.map((example, i) => <details key={example.title} className={styles.example} open={i === 0}><summary><span className={styles.exampleTag}>{example.tag}</span><h3>{example.title}</h3><span className={styles.expand} aria-hidden="true">+</span></summary><div className={styles.exampleBody}><p>{example.text}</p><span>{example.scope}</span></div></details>)}</div>
        <p className={styles.exampleDisclaimer}>Illustrative project scopes. We define the implementation and success criteria together.</p>
      </div></section>

      <section id="approach" className={`container ${styles.approach}`}>
        <div className={styles.sectionHeading}><div><div className={styles.eyebrow}>HOW WE WORK</div><h2>Strategy and delivery<br /><span>Working together</span></h2></div><p>A clear business objective, the right technical foundations and a path into your everyday operations.</p></div>
        <div className={styles.steps}>{[
          ["Understand your business", "Map the current process, the people involved and the constraints. Agree on what a successful outcome looks like.", "A clear problem & project scope"],
          ["Prove the use case", "Design the solution and test a focused first version. Validate the data, workflow and technical choices with your team before expanding it.", "A working pilot & evaluation"],
          ["Integrate & adopt", "Connect the solution to the agreed systems, document how it works and help your team use and maintain it.", "Implementation & team handover"],
        ].map(([title, text, output]) => <article key={title}><h3>{title}</h3><p>{text}</p><span className={styles.stepOutput}>{output}</span></article>)}</div>
      </section>

      <section className={styles.contactSection} id="request-access"><div className={`container ${styles.contactGrid}`}>
        <div><div className={styles.eyebrow}>LET’S TALK</div><h2>What’s next<br /><span>for your business?</span></h2><p>Tell us what your team is trying to achieve. We’ll explore a practical next step together.</p><ul className={styles.contactPoints}><li>No technical brief needed</li><li>One project or a wider transformation roadmap</li><li>A direct conversation with the team</li></ul><div className={styles.contactFinance}>Exploring our financial services offering?<br /><Link href="/financial-services#request-access">Request financial infrastructure access <ArrowUpRight size={14} aria-hidden="true" /></Link></div></div>
        <RequestAccess variant="project" />
      </div></section>
    </main>
    <div className={styles.footerWrap}><Footer /></div>
  </>;
}
