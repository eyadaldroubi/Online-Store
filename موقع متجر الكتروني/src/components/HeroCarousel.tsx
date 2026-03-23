import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { HeroImage } from '../types';

interface HeroCarouselProps {
  heroImages: HeroImage[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ heroImages }) => {
  const [currentHeroIdx, setCurrentHeroIdx] = useState(0);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentHeroIdx(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  if (heroImages.length === 0) return null;

  return (
    <section className="relative h-[400px] rounded-[32px] overflow-hidden group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentHeroIdx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img 
            src={heroImages[currentHeroIdx].url} 
            alt={heroImages[currentHeroIdx].title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent flex flex-col justify-center p-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-lg space-y-6"
            >
              <span className="bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">عرض حصري</span>
              <h2 className="text-5xl font-bold text-white leading-tight">
                {heroImages[currentHeroIdx].title}
              </h2>
              <p className="text-slate-200 text-lg leading-relaxed">
                {heroImages[currentHeroIdx].subtitle}
              </p>
              <button 
                onClick={() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-slate-900 px-8 py-3.5 rounded-2xl font-bold hover:bg-slate-50 border border-slate-100 transition-all flex items-center gap-2 group"
              >
                تسوق الآن <ArrowRight className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {heroImages.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentHeroIdx(idx)}
              className={`w-2 h-2 rounded-full transition-all ${currentHeroIdx === idx ? 'bg-white w-6' : 'bg-white/40'}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default React.memo(HeroCarousel);
