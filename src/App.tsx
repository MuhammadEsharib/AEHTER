/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import StorySection from './components/StorySection';
import TechLeap from './components/TechLeap';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import { PRODUCTS } from './constants';
import Tooltip from './components/Tooltip';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useTheme } from './context/ThemeContext';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();
  useSmoothScroll();
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const activeBgClass = theme === 'minimal' ? 'bg-aether-cyan' : 'bg-aether-purple';

  return (
    <main className="relative bg-black min-h-screen selection:bg-aether-cyan selection:text-black">
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <Navbar />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="lg:pl-16 min-h-screen mesh-gradient overflow-x-hidden"
      >
        {/* Progress Tracker (Vertical) - Only Desktop */}
        <motion.div 
          className="fixed top-0 left-16 w-[1px] bg-white/5 h-full z-40 hidden lg:block"
        />
        <motion.div 
          className={`fixed top-0 left-16 w-[1px] h-full z-50 origin-top hidden lg:block transition-colors duration-500`}
          style={{ scaleY, backgroundColor: theme === 'minimal' ? '#6EE7F9' : '#8B5CF6' }}
        />

        <Hero />
        
        <div id="products" className="relative z-10 w-full">
          {PRODUCTS.map((product, index) => (
            <div key={product.id}>
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>

        <StorySection />
        
        <TechLeap />

        <section id="vision" className="py-32 md:py-60 flex items-center justify-center relative overflow-hidden bg-white text-black">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center relative z-10 px-6 w-full max-w-7xl mx-auto"
          >
            <h2 className="text-[15vw] md:text-[var(--font-size-fluid-huge)] font-display font-light tracking-tighter mb-8 md:mb-12 leading-[0.8] uppercase break-words">
              Beyond<br />Limits
            </h2>
            <p className="text-lg md:text-2xl font-light max-w-xl mx-auto mb-10 md:mb-16 opacity-60 tracking-tight leading-relaxed">
              Aether is the culmination of years of research into human latency and cognitive flow.
            </p>
            <Tooltip text="Inquire for institutional access">
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  const target = e.currentTarget;
                  target.classList.add('animate-haptic');
                  setTimeout(() => target.classList.remove('animate-haptic'), 400);
                }}
                className="pill-button bg-black text-white px-8 md:px-12 py-4 md:py-6 border-none hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-shadow relative overflow-hidden group" 
                aria-label="Reserve access to future systems"
              >
                <span className="relative z-10">Apply for beta</span>
                <motion.div 
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-white/10 skew-x-12"
                />
              </motion.button>
            </Tooltip>
          </motion.div>
          
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none flex items-center justify-center overflow-hidden">
            <span className="text-[60vw] lg:text-[40vw] font-black leading-none tracking-tighter">FUTURE</span>
          </div>
        </section>

        <ContactSection />

        <Footer />
      </motion.div>

      {/* Global Cinematic Noise Texture */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>
    </main>
  );
}
