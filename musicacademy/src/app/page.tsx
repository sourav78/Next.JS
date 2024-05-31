import FeaturedCard from "@/components/FeaturedCard";
import FeaturedCources from "@/components/FeaturedCources";
import HeroSection from "@/components/HeroSection";
import TestimonialCArds from "@/components/TestimonialCArds";
import WhyChoseUs from "@/components/WhyChoseUs";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
        <HeroSection/>
        <FeaturedCources/>
        <WhyChoseUs/>
        <TestimonialCArds/>
        <FeaturedCard/>
      </div>
    </>
  );
}
