import { HeroSection } from '@/components/sections/HeroSection';
import { CakeSection } from '@/components/sections/CakeSection';
import { MessageSection } from '@/components/sections/MessageSection';
import { SlideshowBackground } from '@/components/ui/slideshow-background';

export default function Home() {
  return (
    <main className="bg-transparent min-h-screen text-white overflow-hidden relative z-0">
      <SlideshowBackground />
      <HeroSection />
      <CakeSection />
      <MessageSection />
    </main>
  );
}
