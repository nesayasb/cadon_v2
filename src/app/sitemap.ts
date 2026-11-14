import type {MetadataRoute} from "next";
import {OFFERINGS} from "@/lib/offerings";
export default function sitemap():MetadataRoute.Sitemap{return [{url:"https://www.cadon.io",changeFrequency:"monthly",priority:1},...OFFERINGS.map(offering=>({url:`https://www.cadon.io${offering.href}`,changeFrequency:"monthly" as const,priority:.9})),{url:"https://www.cadon.io/demo/chatgpt",changeFrequency:"monthly",priority:.7},{url:"https://www.cadon.io/privacy",changeFrequency:"monthly",priority:.3}]}
