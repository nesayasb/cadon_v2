import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {ArrowRight,ArrowUpRight,Check,Database,BrainCircuit,PanelsTopLeft,Compass} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RequestAccess from "@/components/RequestAccess";
import {OFFERINGS} from "@/lib/offerings";
import {OFFERING_DETAILS} from "@/lib/offering-details";
import styles from "./offering.module.css";

const icons={"data-analytics":Database,"ai-automation":BrainCircuit,"digital-it":PanelsTopLeft,"strategy-transformation":Compass};
export function generateStaticParams(){return OFFERINGS.filter(offering=>offering.slug!=="financial-services").map(offering=>({slug:offering.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;const offering=OFFERINGS.find(item=>item.slug===slug);if(!offering||!OFFERING_DETAILS[slug])notFound();
  return {title:`${offering.title} — CADON`,description:offering.description,alternates:{canonical:offering.href},openGraph:{title:`${offering.title} — CADON`,description:offering.description,url:offering.href,siteName:"CADON",type:"website"},twitter:{card:"summary_large_image",title:`${offering.title} — CADON`,description:offering.description}};
}
export default async function OfferingPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const offering=OFFERINGS.find(item=>item.slug===slug);const detail=OFFERING_DETAILS[slug];if(!offering||!detail)notFound();
  const Icon=icons[slug as keyof typeof icons];
  return <><a className="skip-link" href="#main">Skip to content</a><Navbar/><main id="main">
    <section className={`container ${styles.hero}`}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">CADON</Link><ArrowRight size={12} aria-hidden="true"/><Link href="/#services">Core offerings</Link><ArrowRight size={12} aria-hidden="true"/><span>{offering.title}</span></nav>
      <div className={styles.heroGrid}><div><div className="eyebrow">OUR CORE OFFERINGS</div><h1>{offering.title}</h1><p>{detail.introduction}</p><a className="button" href="#project">Discuss this service <ArrowUpRight size={17} aria-hidden="true"/></a></div><div className={styles.visual} aria-hidden="true"><span/><Icon size={105} strokeWidth={1}/></div></div>
    </section>
    <section className={styles.focusSection}><div className="container"><div className="eyebrow">WHERE WE CAN HELP</div><h2>From the challenge to a working solution</h2><div className={styles.focusGrid}>{detail.focus.map(item=><article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>
    <section className={`container ${styles.examples}`}><div className="eyebrow">PROJECT POSSIBILITIES</div><h2>What this could look like</h2><p className={styles.note}>Illustrative project scopes, shaped around your requirements</p><div className={styles.exampleGrid}>{detail.examples.map(item=><article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
    <section className={styles.deliverySection}><div className={`container ${styles.deliveryGrid}`}><div><div className="eyebrow">A PRACTICAL HANDOVER</div><h2>What your team receives</h2><p>The exact deliverables are agreed when we scope the project. Our aim is a solution your team understands and can operate.</p></div><ul>{detail.outputs.map(output=><li key={output}><Check size={17} aria-hidden="true"/><span>{output}</span></li>)}</ul></div></section>
    <section className={`container ${styles.related}`}><h2>Connected to your wider roadmap</h2><p>A project may span more than one service. Explore the other ways CADON can help.</p><div>{OFFERINGS.filter(item=>item.slug!==slug).map(item=><Link href={item.href} key={item.slug}>{item.title}<ArrowUpRight size={15} aria-hidden="true"/></Link>)}</div></section>
    <section id="project" className={styles.project}><div className={`container ${styles.projectGrid}`}><div><div className="eyebrow">LET’S TALK</div><h2>Bring us your challenge</h2><p>{detail.startingPoint}</p></div><RequestAccess key={offering.slug} variant="project" defaultInterest={offering.interest}/></div></section>
  </main><Footer/></>;
}
