"use client";
import {useState} from "react";
import Link from "next/link";
import {ArrowUpRight, Plus, Minus} from "lucide-react";
import styles from "./BusinessNeeds.module.css";

const needs=[
  {label:"Automate a process",example:"When a customer sends an enquiry, draft a reply from your service catalogue and queue it for your team to approve.",service:"AI & Automation",slug:"ai-automation"},
  {label:"Make sense of my data",example:"Replace the weekly spreadsheet chase with one sales dashboard that shows which enquiries became orders and where deals stalled.",service:"Data & Analytics",slug:"data-analytics"},
  {label:"Connect my systems",example:"Send a website booking straight to your CRM and scheduling tool so staff only enter the customer’s details once.",service:"Digital & IT Solutions",slug:"digital-it"},
];

export default function BusinessNeeds(){
  const [active,setActive]=useState<number|null>(null);
  return <section className={styles.explorer} aria-labelledby="business-needs-title">
    <h2 id="business-needs-title">What would you like to do?</h2>
    <div className={styles.nodes}>{needs.map(({label,example,service,slug},i)=>{
      const open=active===i;
      return <div className={styles.node} key={slug}>
        <button type="button" aria-expanded={open} aria-controls={`need-${slug}`} onClick={()=>setActive(open?null:i)}>
          <span className={styles.dot} aria-hidden="true"/>{label}{open?<Minus size={15} aria-hidden="true"/>:<Plus size={15} aria-hidden="true"/>}
        </button>
        <div hidden={!open} id={`need-${slug}`} className={styles.detail}>
          <p>{example}</p>
          <Link href={`/services/${slug}`}>Explore {service} <ArrowUpRight size={14} aria-hidden="true"/></Link>
        </div>
      </div>;
    })}</div>
  </section>;
}
