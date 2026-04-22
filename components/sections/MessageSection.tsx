'use client';

import { motion } from 'framer-motion';

export const MessageSection = () => {
  return (
    <div className="min-h-[80vh] bg-transparent flex items-center justify-center p-8 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-transparent to-fuchsia-900/10 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl text-center p-12 md:p-20 rounded-3xl backdrop-blur-md bg-white/5 border border-white/10 shadow-[0_0_60px_rgba(255,255,255,0.05)] relative z-10"
      >
        <p className="text-3xl md:text-5xl lg:text-6xl text-white font-serif italic leading-relaxed font-light tracking-wide">
          “Happy 50th Birthday, Papa. You mean the world to me. I’m so grateful for all the sacrifices you’ve made and the constant effort you put into keeping our family happy. I love you more than words can express.”
        </p>
      </motion.div>
    </div>
  );
};
