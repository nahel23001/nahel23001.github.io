import React from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { content } from '@/content';

interface HeroProps {
  onDownload?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onDownload }) => {
  // Koordinat mouse untuk kalkulasi rotasi 3D
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Koordinat mouse untuk posisi kilatan cahaya (glare effect)
  const glareX = useMotionValue(0);
  const glareY = useMotionValue(0);
  const glareOpacity = useMotionValue(0);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Hitung rotasi derajat kemiringan (maksimal 15 derajat)
    const rX = ((mouseY / height) - 0.5) * -30;
    const rY = ((mouseX / width) - 0.5) * 30;

    rotateX.set(rX);
    rotateY.set(rY);

    // Update posisi kilatan cahaya
    glareX.set(mouseX);
    glareY.set(mouseY);
    glareOpacity.set(0.15); // Tingkat terang kilatan saat mouse di atas foto
  }

  function handleMouseLeave() {
    // Kembalikan posisi foto ke tegak semula saat kursor pergi
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
  }

  return (
    <section id="hero" className="min-h-screen flex items-center pt-24 px-6 sm:px-8 lg:px-[5vw] max-w-[1280px] mx-auto relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        
        {/* Kolom Kiri: Teks Informasi */}
        <div className="lg:col-span-7 z-10 flex flex-col justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-secondary leading-[1.15] mb-6"
          >
            {content.hero.tagline}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-foreground/80 dark:text-gray-300 max-w-2xl leading-relaxed mb-10"
          >
            {content.hero.subDescription}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <a 
              href="#work" 
              className="bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-2xl font-semibold shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              View Work
            </a>
            
            <a 
              href="/CV.pdf"
              download="CV.pdf"
              onClick={() => {
                if (onDownload) onDownload();
              }}
              className="border border-primary/20 dark:border-white/20 hover:border-primary dark:hover:border-white text-primary dark:text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:-translate-y-0.5 bg-transparent cursor-pointer"
            >
              Download CV
            </a>
          </motion.div>
        </div>

        {/* Kolom Kanan: Foto Profil dengan Efek 3D Card Hover + Glare */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end w-full perspective-[1000px]">
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="w-full max-w-[400px] aspect-[4/5] rounded-[2.5rem] border border-primary/10 dark:border-white/10 shadow-2xl relative bg-slate-100 dark:bg-slate-900 overflow-hidden cursor-pointer group"
          >
            {/* Foto Profil Utama */}
            <img 
              src="/foto-profile.jpeg" 
              alt={content.hero.name} 
              style={{ transform: "translateZ(30px)" }}
              className="w-full h-full object-cover object-center pointer-events-none transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/foto-profile.jpeg";
              }}
            />

            {/* Gradasi Bayangan Dasar */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent pointer-events-none" />

            {/* Efek Kilatan Cahaya Dinamis */}
            <motion.div
              style={{
                position: "absolute",
                left: glareX,
                top: glareY,
                opacity: glareOpacity,
                translateX: "-50%",
                translateY: "-50%",
                background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)",
              }}
              className="w-[300px] h-[300px] pointer-events-none z-30 mix-blend-overlay transition-opacity duration-300"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
};