'use client';

import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';

export const HeroSection = () => {
  return (
    <ScrollExpandMedia
      mediaType="image"
      mediaSrc="/images/dad1.jpeg"
      bgImageSrc="/images/bg.jpg"
      title="Happy 50th Birthday Papa"
      date=""
      scrollToExpand="Scroll down for a surprise"
      textBlend={true}
    >
      <div className="flex flex-col items-center justify-center p-4">
        <p className="text-lg md:text-xl text-center text-white/50 max-w-2xl mt-8 mb-16 animate-bounce tracking-widest uppercase">
          Keep scrolling...
        </p>
      </div>
    </ScrollExpandMedia>
  );
};
