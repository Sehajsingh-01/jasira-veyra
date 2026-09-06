import IntroWrapper from '@/components/intro/IntroWrapper';
import HeroSection from '@/components/hero/HeroSection';
import HomeSections from '@/components/home/HomeSections';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-midnight text-cream font-[family-name:var(--font-body)]">
      <IntroWrapper />
      <HeroSection />
      <HomeSections />
    </main>
  );
}
