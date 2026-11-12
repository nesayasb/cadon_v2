import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
 metadataBase: new URL("https://www.cadon.io"), title: "CADON — AI Consulting & Engineering",
 description: "Put AI to work across your business. CADON helps companies with AI strategy, workflow automation, system integrations and custom assistants.",
 alternates:{canonical:"/"},openGraph:{title:"CADON — Put AI to work across your business",description:"AI consulting and engineering. From the first opportunity to a working solution.",url:"/",siteName:"CADON",type:"website"},twitter:{card:"summary_large_image",title:"CADON — AI Consulting & Engineering",description:"From the first opportunity to a working solution."}
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
