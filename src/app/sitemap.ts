import type {MetadataRoute} from "next";
export default function sitemap():MetadataRoute.Sitemap{return [{url:"https://www.cadon.io",changeFrequency:"monthly",priority:1},{url:"https://www.cadon.io/demo/chatgpt",changeFrequency:"monthly",priority:.7},{url:"https://www.cadon.io/privacy",changeFrequency:"monthly",priority:.3}]}
