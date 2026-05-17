import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { BRAND } from '../constants';
import Tooltip from './Tooltip';
import Magnetic from './Magnetic';
import { useTheme } from '../context/ThemeContext';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  const activeColorClass = theme === 'minimal' ? 'text-aether-cyan' : 'text-aether-purple';
  const activeBgClass = theme === 'minimal' ? 'bg-aether-cyan' : 'bg-aether-purple';
  const activeShadowClass = theme === 'minimal' ? 'shadow-[0_0_20px_#6EE7F9]' : 'shadow-[0_0_20px_#8B5CF6]';

  return (
    <section ref={containerRef} className="relative min-h-[100svh] lg:h-screen grid grid-cols-1 lg:grid-cols-2 border-b border-aether-border overflow-hidden gpu-accelerated">
      {/* Cinematic Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 mesh-gradient" />
      </div>

      {/* Left/Main Content */}
      <motion.div 
        style={{ opacity, y }}
        className="relative z-10 flex flex-col justify-center px-8 lg:px-24 py-32 lg:py-0 border-b lg:border-b-0 lg:border-r border-aether-border items-center lg:items-start text-center lg:text-left"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center gap-4 mb-8 lg:mb-10"
        >
          <span className="hidden lg:block w-12 h-[1px] bg-aether-dim" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-aether-dim font-bold">
            Laboratory Access v.26
          </span>
        </motion.div>

        <h1 className="text-[var(--font-size-fluid-xl)] lg:text-[var(--font-size-fluid-huge)] font-display font-light tracking-[-0.05em] leading-[0.8] mb-12 lg:mb-16 uppercase text-reveal glow-text">
          Focus<br />
          <span className="text-aether-dim mix-blend-difference">Evolved</span>
        </h1>
        
        <p className="text-xl lg:text-3xl text-aether-dim font-light max-w-lg mb-16 lg:mb-20 leading-tight tracking-tight px-4 lg:px-0">
          Tools for visionaries. Designed to disappear into your workflow. Engineering the future of human-machine convergence.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-8 lg:gap-10">
          <Magnetic strength={0.3}>
            <Tooltip text="Begin your transition">
              <button className="pill-button bg-white text-black hover:bg-transparent hover:text-white px-10 py-5">
                Initialize System
              </button>
            </Tooltip>
          </Magnetic>
          
          <Magnetic strength={0.2}>
            <Tooltip text="View technical archive">
              <button className="text-[11px] uppercase tracking-[0.3em] text-aether-dim hover:text-white transition-colors font-bold">
                Specifications
              </button>
            </Tooltip>
          </Magnetic>
        </div>

        <div className="absolute bottom-10 lg:bottom-16 left-0 lg:left-24 w-full lg:w-auto flex justify-center lg:justify-start gap-12 text-[9px] text-aether-dim font-bold tracking-widest uppercase opacity-60">
          <span className="hover:text-white transition-opacity cursor-pointer">Protocol 01</span>
          <span className="hover:text-white transition-opacity cursor-pointer">Archive</span>
          <span className="hover:text-white transition-opacity cursor-pointer">Contact</span>
        </div>
      </motion.div>

      {/* Right Content - Abstract Visual Meta-Area (Hidden on extreme small devices or modified) */}
      <div className="relative bg-[#020202] flex items-center justify-center p-12 lg:p-24 overflow-hidden min-h-[50vh] lg:min-h-0">
        {/* Spatial Depth Layers */}
        <motion.div 
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[120%] h-[120%] cinematic-gradient opacity-30" 
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="widget relative z-10 w-full max-w-md"
        >
          <div className="glass-panel p-10 rounded-[40px] relative overflow-hidden group">
            {/* Animated Light Sweep */}
            <motion.div 
              animate={{ x: ['100%', '-100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
            />

            <div className="flex justify-between items-center mb-16">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-aether-dim font-bold">Environment</span>
                <span className="text-xs font-display font-medium">Synchronized</span>
              </div>
              <div className="relative">
                <div className={`w-3 h-3 rounded-full animate-pulse transition-all duration-700 ${activeBgClass} ${activeShadowClass}`} />
                <div className={`absolute inset-0 w-3 h-3 rounded-full blur-md opacity-50 transition-colors duration-700 ${activeBgClass}`} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-12">
              <div className="flex justify-between items-end border-b border-white/5 pb-6">
                <div>
                  <div className="text-6xl font-light tracking-tighter mb-1">0.26<span className="text-xl opacity-40 ml-1">ms</span></div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-aether-dim font-bold">Quantum Latency</div>
                </div>
                <div className="w-24 h-[1px] bg-white/20 mb-3" />
              </div>

              <div className="flex justify-between items-end border-b border-white/5 pb-6">
                <div>
                  <div className="text-6xl font-light tracking-tighter mb-1">99.9<span className="text-xl opacity-40 ml-1">%</span></div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-aether-dim font-bold">Neural Sync</div>
                </div>
                <div className={`w-16 h-[1px] mb-3 transition-colors duration-700 ${activeBgClass}`} />
              </div>
            </div>

            <div className="mt-16 flex justify-between items-center">
              <div className="text-[10px] text-aether-dim font-bold tracking-widest uppercase">
                Protocol Active
              </div>
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-white/20" />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Particle Elements */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.5, 0],
              y: [-20, 20],
              x: [-10, 10]
            }}
            transition={{ 
              duration: 5 + i, 
              repeat: Infinity, 
              delay: i * 2 
            }}
            className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
            style={{ 
              top: `${20 + i * 15}%`, 
              left: `${10 + i * 20}%` 
            }}
          />
        ))}
      </div>
    </section>
  );
}
