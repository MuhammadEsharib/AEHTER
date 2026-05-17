import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState, lazy, Suspense } from 'react';
import { cn } from '../lib/utils';
import { Product } from '../types';
import Tooltip from './Tooltip';
import Magnetic from './Magnetic';
import { useTheme } from '../context/ThemeContext';

const Core3D = lazy(() => import('./Core3D'));

const PULSE_VARIANTS = [
  { name: 'Cyan Dawn', color: '#6EE7F9' },
  { name: 'Violet Dusk', color: '#8B5CF6' },
  { name: 'Solaris', color: '#FCD34D' },
];

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [pulseColor, setPulseColor] = useState(product.accent);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);
  const textY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const bgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isPulse = product.id === 'pulse';
  const isCore = product.id === 'core';

  const accentColor = isPulse ? pulseColor : (theme === 'nebula' ? '#8B5CF6' : product.accent);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, filter: 'blur(20px)', scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      scale: 1,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as any }
    },
  };

  return (
    <div ref={ref} className="min-h-[100svh] lg:min-h-[150vh] flex items-center justify-center relative py-20 px-6 md:py-40 overflow-hidden will-change-transform gpu-accelerated lg:px-12">
      {/* Fullscreen Detailed View */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-6 md:p-24 overflow-y-auto"
          >
            <motion.button 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setIsFullscreen(false)}
              className="fixed top-8 right-8 md:top-12 md:right-12 text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 hover:text-white transition-colors z-[210] mix-blend-difference"
            >
              Close_View
            </motion.button>
            
            <div className="container mx-auto grid lg:grid-cols-2 gap-12 md:gap-24 items-center py-20">
              <motion.div
                initial={{ opacity: 0, x: -80, filter: 'blur(20px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }}
                className="order-2 lg:order-1"
              >
                <span className="text-aether-cyan text-[10px] uppercase tracking-[0.5em] font-bold mb-6 block opacity-60">DATA_CORE_{index + 1}</span>
                <h2 className="text-5xl md:text-[var(--font-size-fluid-xl)] font-display font-light uppercase tracking-tighter leading-[0.8] mb-10">
                  {product.name}
                </h2>
                <div className="h-[2px] w-12 md:w-24 bg-aether-cyan mb-12" />
                <p className="text-xl md:text-2xl font-light text-aether-dim max-w-xl leading-relaxed mb-12">
                  {product.description} This instrument represents the zenith of our cognitive interface research. Each component is cross-linked for near-zero cognitive friction.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 border-t border-white/5 pt-12">
                  {product.features.map((f, idx) => (
                    <div key={idx} className="flex flex-col gap-2 group">
                      <span className="text-[9px] uppercase tracking-widest text-white/20 font-bold group-hover:text-aether-cyan transition-colors">NODE_{idx + 1}</span>
                      <span className="text-sm font-light uppercase tracking-widest opacity-60">{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.7, rotateY: 30, filter: 'blur(30px)' }}
                animate={{ opacity: 1, scale: 1, rotateY: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.1, duration: 1.5, ease: [0.16, 1, 0.3, 1] as any }}
                className="aspect-[3/4] glass-panel rounded-[40px] md:rounded-[60px] overflow-hidden relative group perspective-1000 order-1 lg:order-2"
              >
                <motion.img 
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  src={product.image} 
                  className="w-full h-full object-cover grayscale brightness-50" 
                  referrerPolicy="no-referrer" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                
                {/* HUD Overlay Elements */}
                <div className="absolute inset-8 lg:inset-12 border border-white/5 pointer-events-none rounded-[30px] lg:rounded-[40px] flex flex-col justify-between p-6 lg:p-8">
                  <div className="flex justify-between items-start">
                    <div className="w-8 lg:w-12 h-8 lg:h-12 border-t border-l border-aether-cyan/30" />
                    <div className="w-8 lg:w-12 h-8 lg:h-12 border-t border-r border-aether-cyan/30" />
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="w-8 lg:w-12 h-8 lg:h-12 border-b border-l border-aether-cyan/30" />
                    <div className="w-8 lg:w-12 h-8 lg:h-12 border-b border-r border-aether-cyan/30" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          style={{ 
            opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 0.05, 0]),
            scale: useTransform(scrollYProgress, [0, 1], [0.9, 1.1]),
            y: bgY,
            transform: 'translateZ(0)' // GPU optimization
          }}
          className="absolute inset-0 flex items-center justify-center translate-y-[-10%]"
        >
          <span className={`text-[30vw] font-black uppercase tracking-tighter mix-blend-overlay blur-[2px] transition-colors duration-700 ${theme === 'minimal' ? 'text-white' : 'text-aether-purple'}`}>
            {product.name}
          </span>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 grid lg:grid-cols-2 gap-16 md:gap-24 items-center relative z-10">
        <motion.div 
          style={{ y: textY, opacity }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20%" }}
          className={cn("flex flex-col", index % 2 === 1 ? "lg:order-2" : "lg:order-1")}
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-8 h-[1px] bg-white/20" style={{ backgroundColor: accentColor }} />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-aether-dim">
              {product.category} — 0{index + 1}
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-6xl md:text-8xl lg:text-[110px] font-display font-light tracking-tight leading-[0.85] lg:leading-[0.8] mb-10 uppercase"
          >
            {product.name}
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-2xl font-light text-aether-dim mb-12 leading-tight tracking-tight max-w-sm"
          >
            {product.headline} {product.description}
          </motion.p>
          
          {isPulse && (
            <motion.div variants={itemVariants} className="flex gap-10 items-center mb-12 flex-wrap">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">Finish /</span>
              <div className="flex gap-4">
                {PULSE_VARIANTS.map((variant) => (
                  <Tooltip key={variant.name} text={variant.name}>
                    <button
                      onClick={() => setPulseColor(variant.color)}
                      className={cn(
                        "w-8 h-8 rounded-full border border-white/5 transition-all hover:scale-125 p-1",
                        pulseColor === variant.color && "border-white/40"
                      )}
                      aria-label={`Switch color to ${variant.name}`}
                    >
                      <div className="w-full h-full rounded-full" style={{ backgroundColor: variant.color }} />
                    </button>
                  </Tooltip>
                ))}
              </div>
            </motion.div>
          )}

          <motion.ul variants={itemVariants} className="space-y-6 mb-16 overflow-hidden">
            {product.features.map((feature, i) => (
              <motion.li 
                key={i} 
                className="flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-bold opacity-60"
              >
                <div className="w-6 h-[1px] bg-white/10" />
                {feature}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={itemVariants}>
            <Magnetic strength={0.3} className="w-fit">
              <Tooltip text={`Initialize ${product.name}`}>
                <button 
                  className="pill-button bg-white text-black hover:bg-transparent hover:text-white border-none py-6 px-12"
                  aria-label={`Explore and customize ${product.name}`}
                >
                  Secure Instrument
                </button>
              </Tooltip>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div 
          style={{ scale: imageScale, opacity }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={() => setIsFullscreen(true)}
          className={cn(
            "relative group aspect-[4/5] rounded-[30px] md:rounded-[40px] overflow-hidden glass-panel will-change-transform cursor-pointer",
            index % 2 === 1 ? "lg:order-1" : "lg:order-2"
          )}
        >
          {isCore ? (
            <Suspense fallback={<div className="w-full h-full bg-black/50 animate-pulse" />}>
              <div className="w-full h-full bg-black">
                <Core3D />
              </div>
            </Suspense>
          ) : (
            <motion.img 
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover grayscale brightness-50"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          )}

          {/* View Details Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm z-20"
          >
            <button 
              onClick={() => setIsFullscreen(true)}
              className="pill-button px-8 py-4 bg-white text-black border-none text-[10px] uppercase tracking-[0.4em] font-bold"
            >
              View_Details
            </button>
          </motion.div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-aether-black/60 via-transparent to-transparent pointer-events-none" />
          
          <motion.div 
            animate={{ 
              backgroundColor: accentColor,
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -bottom-20 -right-20 w-[400px] h-[400px] blur-[150px] pointer-events-none"
          />
        </motion.div>
      </div>
    </div>
  );
}
