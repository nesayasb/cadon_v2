import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default function NotFound(){return <><Navbar/><main className="container not-found-page"><div className="eyebrow">PAGE NOT FOUND</div><h1>Let’s find your next step</h1><p>The page you’re looking for is not available. Explore CADON’s services or return to the homepage.</p><Link className="button" href="/">Return to CADON</Link></main><Footer/></>}
