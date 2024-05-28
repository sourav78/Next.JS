import FeaturedCources from "@/components/FeaturedCources";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
        <HeroSection/>
        <FeaturedCources/>
      </div>
    </>
  );
}
