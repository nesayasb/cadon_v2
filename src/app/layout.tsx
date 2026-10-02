import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
 metadataBase: new URL("https://www.cadon.io"), title: "CADON — The Financial Execution Layer for AI",
 description: "CADON is building controlled execution infrastructure between AI assistants and financial institutions, with sensitive workflows outside the model.",
 alternates:{canonical:"/"},openGraph:{title:"CADON — Make financial services executable by AI",description:"AI understands the intent. CADON connects it to a controlled financial action.",url:"/",siteName:"CADON",type:"website"},twitter:{card:"summary_large_image",title:"CADON — The Financial Execution Layer for AI"}
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
