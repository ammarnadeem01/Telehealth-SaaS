import Features from "@/components/Features";
import HeroSection from "@/components/HeroSection";
import FAQs from "@/components/FAQ";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <Features />
        <FAQs />
      </main>
    </div>
  );
}
