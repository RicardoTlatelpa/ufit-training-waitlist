import HeroSection from '@/components/sections/HeroSection';
import ProblemSection from '@/components/sections/ProblemSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import WhyUfitSection from '@/components/sections/WhyUfitSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import BetaProgramSection from '@/components/sections/BetaProgramSection';
import AboutSection from '@/components/sections/AboutSection';
import FaqSection from '@/components/sections/FaqSection';
import FinalCtaSection from '@/components/sections/FinalCtaSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <FeaturesSection />
      <WhyUfitSection />
      <HowItWorksSection />
      <BetaProgramSection />
      <AboutSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
