import type {Metadata} from "next";
import {hasDemoAccess} from "@/lib/demo-auth";
import DemoGate from "@/components/DemoGate";
import DemoSession from "@/components/DemoSession";
export const metadata:Metadata={title:"CADON — Interactive AI Demo",alternates:{canonical:"/demo"},robots:{index:false,follow:false}};
export default async function DemoPage(){return await hasDemoAccess()?<DemoSession/>:<DemoGate/>}
