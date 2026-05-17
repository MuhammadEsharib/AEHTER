import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function TechLeap() {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [300, -300]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  const activeColorClass = theme === 'minimal' ? 'text-aether-cyan' : 'text-aether-purple';
  const activeBgClass = theme === 'minimal' ? 'bg-aether-cyan' : 'bg-aether-purple';

  return (
    <section ref={ref} className="py-24 md:py-80 bg-aether-black relative overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className={`absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-current to-transparent animate-pulse ${activeColorClass}`} />
        <div className={`absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-current to-transparent animate-pulse delay-700 ${activeColorClass}`} />
      </div>

      <div className="flex flex-col gap-10 lg:gap-20">
        <motion.div 
          style={{ x: x1 }}
          className="flex whitespace-nowrap gap-10 lg:gap-20 items-center opacity-40 select-none pointer-events-none transition-colors duration-700"
        >
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-3xl lg:text-9xl font-display font-light uppercase tracking-tighter">
              Precision Instruments <span className={activeColorClass}>•</span> Neural Architecture
            </span>
          ))}
        </motion.div>

        <div className="container mx-auto px-8 lg:px-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center relative z-10 py-20"
          >
            <div className="inline-block px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-8">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/60">Quantum Compute Module</span>
            </div>
            <h2 className="text-5xl md:text-[var(--font-size-fluid-huge)] font-display font-light tracking-tighter leading-[0.8] mb-12 uppercase">
              The Speed<br />of Thought
            </h2>
            <p className="text-lg lg:text-2xl font-light text-aether-dim max-w-2xl mx-auto tracking-tight leading-tight">
              Our proprietary neural core allows for sub-millisecond response times, making the tool an extension of your own biology. No lag. No friction. Just flow.
            </p>
          </motion.div>
        </div>

        <motion.div 
          style={{ x: x2 }}
          className="flex whitespace-nowrap gap-10 lg:gap-20 items-center opacity-40 select-none pointer-events-none transition-colors duration-700"
        >
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-3xl lg:text-9xl font-display font-light uppercase tracking-tighter">
              Subtractive Logic <span className={activeColorClass}>•</span> Zero Latency
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
