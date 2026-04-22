import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import RoleSelector from "@/components/RoleSelector";
import CodeIntegration from "@/components/CodeIntegration";
import Product from "@/components/Product";
import HowItWorks from "@/components/HowItWorks";
import UseCases from "@/components/UseCases";
import WhySection from "@/components/WhySection";
import PrinciplesSection from "@/components/PrinciplesSection";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <RoleSelector />
        <CodeIntegration />
        <Product />
        <HowItWorks />
        <UseCases />
        <WhySection />
        <PrinciplesSection />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
