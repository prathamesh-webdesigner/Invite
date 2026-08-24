import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import HowItWorks from '../components/HowItWorks';
import WhyUs from '../components/WhyUs';
import CTASection from '../components/CTASection';

export default function Home() {
  return (
    <div>
      <Hero />
      <CategorySection />
      <HowItWorks />
      <WhyUs />
      <CTASection />
    </div>
  );
}
