import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
 metadataBase: new URL("https://www.cadon.io"), title: "CADON — Data, AI & IT Consulting",
 description: "CADON helps companies with data analytics, artificial intelligence, digital and IT solutions, transformation strategy and financial services technology.",
 alternates:{canonical:"/"},openGraph:{title:"CADON — Data. AI. IT. Built around your business.",description:"Consulting and engineering across data, AI, IT and financial services technology.",url:"/",siteName:"CADON",type:"website"},twitter:{card:"summary_large_image",title:"CADON — Data, AI & IT Consulting",description:"Your partner in digital transformation."}
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
