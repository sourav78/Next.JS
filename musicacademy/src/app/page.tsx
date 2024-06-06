import FeaturedCard from "@/components/FeaturedCard";
import FeaturedCources from "@/components/FeaturedCources";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Instructors from "@/components/Instructors";
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
        <Instructors/>
        <Footer/>
      </div>
    </>
  );
}
