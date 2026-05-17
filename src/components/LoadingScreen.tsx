import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[1000] bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Cinematic Layered Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1],
            rotate: [2, -2, 2],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-[50%] opacity-30"
        >
          <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-aether-cyan/15 blur-[200px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[180px] rounded-full animate-pulse delay-1000" />
        </motion.div>
        
        {/* Dynamic Gradient Sweep */}
        <motion.div 
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 0.5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-aether-cyan/5 to-transparent skew-x-12 pointer-events-none"
        />

        {/* Global Cinematic Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-[size:200px_200px]" />

        {/* WebGL-inspired Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]" />
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-16">
          <motion.div 
            initial={{ scale: 0.85, opacity: 0, letterSpacing: "0.5em" }}
            animate={{ scale: 1, opacity: 1, letterSpacing: "0.1em" }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl font-display font-light"
          >
            AE<span className="text-aether-cyan">.</span>
          </motion.div>
          
          {/* Decorative Rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-12 border border-white/5 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-6 border border-white/10 rounded-full border-dashed"
          />
        </div>

        {/* Status System */}
        <div className="flex flex-col items-center gap-6">
          <div className="w-64 h-[1px] bg-white/5 relative overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="absolute inset-y-0 left-0 bg-aether-cyan shadow-[0_0_15px_rgba(34,211,238,0.6)]"
            />
          </div>
          
          <div className="flex flex-col items-center gap-1">
            <motion.span 
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[8px] uppercase tracking-[0.8em] font-bold text-white/40"
            >
              Establishing_Neural_Sync
            </motion.span>
            <span className="text-[10px] font-mono text-aether-cyan tabular-nums opacity-80">{progress.toString().padStart(3, '0')}%</span>
          </div>
        </div>

        {/* Floating Data Particles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.4, 0],
                y: [50, -150],
                x: (i - 5.5) * 50,
                scale: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                delay: i * 0.3,
                ease: "easeOut"
              }}
              className="absolute bottom-1/2 left-1/2 w-[1px] h-8 bg-gradient-to-t from-aether-cyan/40 to-transparent"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
