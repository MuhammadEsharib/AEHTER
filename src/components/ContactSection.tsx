import { motion } from 'motion/react';
import Magnetic from './Magnetic';
import Tooltip from './Tooltip';

export default function ContactSection() {
  const contacts = [
    { label: 'Technical Inquiry', value: 'tech@aether.labs', tooltip: 'Development & Engineering' },
    { label: 'Design Collective', value: 'studio@aether.labs', tooltip: 'Creative & Interface' },
    { label: 'Institutional Access', value: 'auth@aether.labs', tooltip: 'Partnerships & Scale' },
  ];

  return (
    <section id="contact" className="py-32 md:py-60 px-6 md:px-12 lg:px-24 bg-aether-black border-t border-white/5 relative overflow-hidden gpu-accelerated">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32 items-center lg:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-8 md:mb-12"
            >
              <div className="w-8 md:w-12 h-[1px] bg-aether-cyan" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-aether-cyan font-bold">
                Direct Protocols
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-[var(--font-size-fluid-xl)] font-display font-light tracking-tighter leading-[0.8] mb-12 md:mb-20 uppercase">
              Start the<br />
              <span className="text-aether-dim">Convergence</span>
            </h2>

            <div className="space-y-10 md:space-y-16">
              {contacts.map((contact, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col gap-3 md:gap-4 group"
                >
                  <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/20 group-hover:text-aether-cyan transition-colors">{contact.label}</span>
                  <Magnetic strength={0.1}>
                    <Tooltip text={contact.tooltip}>
                      <a 
                        href={`mailto:${contact.value}`}
                        className="text-xl md:text-2xl lg:text-4xl font-light tracking-tight hover:text-white transition-colors break-words"
                      >
                        {contact.value}
                      </a>
                    </Tooltip>
                  </Magnetic>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="w-full max-w-[500px] aspect-square glass-panel rounded-full flex items-center justify-center relative overflow-hidden">
              {/* Pulsing Core */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-1/2 h-1/2 bg-aether-cyan blur-[60px] md:blur-[100px] rounded-full"
              />
              
              <div className="relative z-10 text-center p-8 md:p-12">
                <div className="text-[8px] md:text-[10px] uppercase tracking-[0.5em] font-bold text-white/40 mb-6 md:mb-8">GLOBAL_COMMUNICATIONS_NODE</div>
                <div className="text-3xl md:text-5xl font-display font-light mb-6 md:mb-8">ZURICH<br/>HKG<br/>NYC</div>
                <div className="flex justify-center gap-3 md:gap-4">
                  {[...Array(4)].map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ height: [4, 20, 4] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      className="w-[1px] bg-aether-cyan" 
                    />
                  ))}
                </div>
              </div>

              {/* Orbital Lines */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border border-dashed border-white/5 rounded-full"
              />
            </div>
            
            {/* Ambient Social Link */}
            <div className="absolute -bottom-8 md:-bottom-12 right-0 lg:right-0">
              <Magnetic strength={0.4}>
                <a href="#" className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/10 flex items-center justify-center text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all">
                  Twitter_
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-aether-cyan/5 to-transparent pointer-events-none" />
    </section>
  );
}
