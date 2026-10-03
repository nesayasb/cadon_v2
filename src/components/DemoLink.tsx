"use client";
import Link from "next/link";
import {trackEvent} from "@/lib/demo-events";
export default function DemoLink({chatgpt=false,children,className}:{chatgpt?:boolean;children:React.ReactNode;className?:string}){return <Link href={chatgpt?"/demo/chatgpt":"/demo"} className={className} onClick={()=>trackEvent(chatgpt?"chatgpt_cta_clicked":"homepage_demo_cta_clicked")}>{children}</Link>}
