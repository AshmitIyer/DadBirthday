'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const images = [
  '/images/slide1.jpg',
  '/images/slide2.jpg',
  '/images/slide3.jpg',
  '/images/slide4.jpg',
  '/images/slide5.jpg',
];

export const SlideshowBackground = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] bg-black">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt="Slideshow Background"
            fill
            className="object-cover object-center"
            priority={currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>
      {/* Dark overlay and subtle blur to ensure cake and message are clearly visible and pop out */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-0" />
    </div>
  );
};
