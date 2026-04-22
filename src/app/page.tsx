import Navbar from "@/components/Navbar";
import LandingV4Body from "@/components/LandingV4Body";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <LandingV4Body />
      </main>
      <Footer />
    </div>
  );
}
