"use client";
import {useState} from "react";
export default function CopyCode({code}:{code:string}){const [label,setLabel]=useState("Copy");return <button className="copy-button" onClick={async()=>{try{await navigator.clipboard.writeText(code);setLabel("Copied");}catch{setLabel("Select code to copy");}setTimeout(()=>setLabel("Copy"),2500)}} aria-live="polite">{label}</button>}
