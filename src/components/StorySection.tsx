import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [50, -150]);
  const textY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const activeColorClass = theme === 'minimal' ? 'text-aether-cyan' : 'text-aether-purple';
  const activeBgClass = theme === 'minimal' ? 'bg-aether-cyan' : 'bg-aether-purple';

  return (
    <section id="story" ref={containerRef} className="py-60 relative overflow-hidden bg-aether-dark gpu-accelerated">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <motion.div 
            style={{ y: textY, opacity }}
            className="relative z-10 order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex items-center gap-4 mb-8 md:mb-12"
            >
              <div className={`w-8 md:w-12 h-[1px] transition-colors duration-500 ${activeBgClass}`} />
              <span className={`text-[10px] uppercase tracking-[0.4em] font-bold transition-colors duration-500 ${activeColorClass}`}>
                Design Philosophy
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-[var(--font-size-fluid-xl)] font-display font-light tracking-tight leading-[0.8] mb-10 md:mb-12 uppercase">
              The Art of<br />
              <span className="text-aether-dim">Reduced</span><br />
              Complexity
            </h2>
            <p className="text-lg md:text-2xl font-light text-aether-dim max-w-lg mb-12 md:mb-16 leading-tight tracking-tight">
              We believe that the most powerful tools are the ones that disappear. Every line, every texture, and every millisecond of latency is optimized for the flow state.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 border-t border-white/5 pt-12">
              <div>
                <div className="text-3xl md:text-4xl font-light tracking-tighter mb-2">Since 2024</div>
                <div className="text-[9px] uppercase tracking-[0.2em] text-white/20 font-bold">Research Labs</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-light tracking-tighter mb-2">124 Patents</div>
                <div className="text-[9px] uppercase tracking-[0.2em] text-white/20 font-bold">Human Interface</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            style={{ y: imgY }}
            className="relative order-1 lg:order-2"
          >
            <div className="aspect-[3/4] rounded-[40px] md:rounded-[60px] overflow-hidden glass-panel">
              <img 
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000" 
                alt="Laboratory research" 
                className="w-full h-full object-cover grayscale brightness-50"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            </div>
            
            {/* Overlay Info Card */}
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 50, opacity: 1 }}
              style={{ y: -100 }}
              className="absolute top-1/2 -right-12 glass-panel p-8 rounded-3xl w-64 hidden lg:block"
            >
              <div className="text-[9px] uppercase tracking-[0.2em] text-aether-dim font-bold mb-4">Origin /</div>
              <p className="text-sm font-light leading-relaxed mb-6">
                Based in Zurich, our team of designers and engineers work at the intersection of psychology and physics.
              </p>
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-4 h-[1px] bg-aether-cyan" />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Interactive Story Blocks */}
        <div className="mt-32 md:mt-60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Precision Architecture",
              description: "Engineered down to the atomic level, our hardware uses proprietary alloys and neural-link connectors.",
              icon: "01",
              details: ["Atomic Latency", "Neural Core", "Quantum Sync"],
              longDesc: "Our architecture utilizes a unique sub-atomic bonding process, ensuring that every signal travels with zero interference. The neural-link connectors are hand-calibrated for each user's specific cognitive profile."
            },
            {
              title: "Immersive Workflows",
              description: "The interface adapts to your cognitive load, surfacing tools exactly when your brain expects them.",
              icon: "02",
              details: ["Cognitive Scaling", "Spatial Audio", "Haptic Flow"],
              longDesc: "By monitoring micro-fluctuations in attention, Aether adjusts its visual density in real-time. On-screen elements fade when focus intensifies, reappearing only when needed."
            },
            {
              title: "Futuristic Legacy",
              description: "Built to last a century, each module is fully repairable and upgradeable for future intelligence.",
              icon: "03",
              details: ["Eternal Build", "Modular OS", "Legacy Support"],
              longDesc: "We reject planned obsolescence. Every Aether device is a modular platform, designed to be upgraded as new neural-processing technologies emerge over the coming decades."
            }
          ].map((item, i) => {
            const [isExpanded, setIsExpanded] = useState(false);
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="group relative p-12 glass-panel rounded-[40px] hover:bg-white/[0.03] transition-colors overflow-hidden flex flex-col justify-between min-h-[400px]"
              >
                <div className="relative z-10">
                  <span className={`text-[10px] font-bold tracking-widest block mb-4 transition-colors duration-500 ${activeColorClass}`}>PROTOCOL_{item.icon}</span>
                  <h3 className="text-2xl md:text-3xl font-display font-light uppercase tracking-tight mb-6">{item.title}</h3>
                  
                  <AnimatePresence mode="wait">
                    {!isExpanded ? (
                      <motion.p 
                        key="desc"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-sm font-light text-aether-dim leading-relaxed max-w-xs lg:max-w-[200px]"
                      >
                        {item.description}
                      </motion.p>
                    ) : (
                      <motion.p 
                        key="longDesc"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="text-sm font-light text-white leading-relaxed"
                      >
                        {item.longDesc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative z-20 mt-12">
                  <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`text-[10px] uppercase tracking-[0.4em] font-bold hover:text-white transition-colors cursor-pointer duration-500 ${activeColorClass}`}
                  >
                    {isExpanded ? "Collapse_Data" : "Learn_More"}
                  </button>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mt-8 space-y-4"
                      >
                        <div className="h-[1px] bg-white/10 mb-6" />
                        {item.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-4">
                            <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-colors duration-500 ${activeBgClass}`} />
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/60">{detail}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Parallax Background Elements */}
                <motion.div 
                  initial={{ scale: 1, x: 0, y: 0 }}
                  whileHover={{ 
                    scale: 1.2, 
                    x: [0, 10, -10, 0],
                    y: [0, -10, 10, 0],
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute -bottom-20 -right-20 w-60 h-60 bg-aether-cyan/10 blur-[80px] rounded-full pointer-events-none" 
                />
                
                <motion.div 
                  initial={{ scale: 0.8, x: 0, y: 0 }}
                  whileHover={{ 
                    scale: 1.1,
                    x: [0, -15, 15, 0],
                    y: [0, 15, -15, 0],
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/5 blur-[60px] rounded-full pointer-events-none" 
                />

                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-aether-cyan/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-center" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
