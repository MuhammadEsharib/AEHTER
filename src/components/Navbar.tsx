import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import Tooltip from './Tooltip';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const menuVariants = {
    closed: { scaleY: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } },
    open: { scaleY: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as any } }
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1, 
      y: 0,
      transition: { delay: 0.3 + (i * 0.1), duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
    })
  };

  const navLinks = [
    { name: 'Instruments', href: '#products' },
    { name: 'Research', href: '#story' },
    { name: 'Vision', href: '#vision' },
    { name: 'Protocol', href: '#contact' }
  ];

  return (
    <>
      {/* Desktop Rail */}
      <motion.nav 
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="nav-rail hidden lg:flex fixed left-0 top-0 h-full w-16 border-r py-10"
      >
        <Tooltip text="AETHER Labs">
          <a href="#" className="text-xl font-display font-bold tracking-tighter cursor-help hover:scale-110 transition-transform">
            AE
          </a>
        </Tooltip>
        
        <div className="flex flex-col items-center gap-12">
          <Tooltip text={`Switch to ${theme === 'minimal' ? 'Nebula' : 'Minimal'} design`}>
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group hover:border-white/40 transition-colors"
            >
              <div className={`w-2 h-2 rounded-full ${theme === 'minimal' ? 'bg-aether-cyan' : 'bg-aether-purple'} animate-pulse shadow-[0_0_10px_currentColor]`} />
            </button>
          </Tooltip>

          <div className="rail-text font-display opacity-40 hover:opacity-80 transition-opacity [writing-mode:vertical-lr] rotate-180 text-[10px] tracking-[0.4em] uppercase">
            SYSTEMS V.26 — {theme === 'minimal' ? 'MINIMAL_CORE' : 'NEBULA_STREAM'}
          </div>
        </div>
        
        <Tooltip text="System Online">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
            className={`text-lg transition-colors duration-500 ${theme === 'minimal' ? 'text-aether-cyan' : 'text-aether-purple'} cursor-help`}
          >
            ●
          </motion.div>
        </Tooltip>
      </motion.nav>

      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 w-full z-[100] px-6 py-6 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="text-xl font-display font-bold tracking-tighter">AE<span className={`transition-colors duration-500 ${theme === 'minimal' ? 'text-aether-cyan' : 'text-aether-purple'}`}>.</span></div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={toggleTheme}
            className={`text-[10px] uppercase tracking-widest font-bold transition-colors ${theme === 'minimal' ? 'text-aether-cyan' : 'text-aether-purple'}`}
          >
            {theme === 'minimal' ? '[MIN]' : '[NEB]'}
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-[200] w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
          >
            <motion.span 
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }}
              className="w-6 h-[1px] bg-white" 
            />
            <motion.span 
              animate={{ opacity: isOpen ? 0 : 1 }}
              className="w-6 h-[1px] bg-white" 
            />
            <motion.span 
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -7 : 0 }}
              className="w-6 h-[1px] bg-white" 
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="lg:hidden fixed inset-0 z-[150] bg-aether-black origin-top flex items-center justify-center overflow-y-auto px-6 py-20"
          >
            <div className="flex flex-col items-center gap-12">
              {navLinks.map((link, i) => (
                <motion.a 
                  key={link.name}
                  href={link.href}
                  custom={i}
                  variants={linkVariants}
                  onClick={() => setIsOpen(false)}
                  className="text-5xl font-display font-light uppercase tracking-tighter text-aether-dim hover:text-white transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            
            {/* Background Grid for Menu */}
            <div className="absolute inset-0 z-[-1] opacity-5 pointer-events-none">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
