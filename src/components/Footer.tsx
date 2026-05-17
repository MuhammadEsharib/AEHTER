import Tooltip from './Tooltip';
import Magnetic from './Magnetic';

export default function Footer() {
  return (
    <footer className="py-32 md:py-60 px-6 md:px-12 lg:px-24 border-t border-white/5 bg-aether-black text-white/40">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-24 lg:gap-32">
        <div className="lg:col-span-2">
          <h2 className="text-5xl md:text-6xl font-display font-light text-white mb-8 md:mb-10 tracking-tighter uppercase">
            AETHER Labs<span className="text-aether-cyan">.</span>
          </h2>
          <p className="text-lg md:text-xl font-light text-aether-dim max-w-sm mb-12 md:mb-16 leading-tight tracking-tight">
            An independent design collective engineering the tools of future intelligence.
          </p>
          <div className="flex flex-wrap gap-8 md:gap-12 text-[10px] uppercase tracking-[0.4em] font-bold text-white/60">
            <Magnetic strength={0.2}><Tooltip text="Follow our visual archive"><a href="#" className="hover:text-white transition-colors">Instagram</a></Tooltip></Magnetic>
            <Magnetic strength={0.2}><Tooltip text="Join the technical discussion"><a href="#" className="hover:text-white transition-colors">Twitter</a></Tooltip></Magnetic>
            <Magnetic strength={0.2}><Tooltip text="Direct communication"><a href="#" className="hover:text-white transition-colors">Contact</a></Tooltip></Magnetic>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white mb-8 md:mb-10 opacity-40">System Access</h4>
          <ul className="space-y-4 md:space-y-6 text-sm font-light">
            <li><Tooltip text="Modular focus instrument"><a href="#" className="hover:text-white transition-colors">Aether Nova</a></Tooltip></li>
            <li><Tooltip text="Reactive environmental core"><a href="#" className="hover:text-white transition-colors">Aether Pulse</a></Tooltip></li>
            <li><Tooltip text="Central intelligence module"><a href="#" className="hover:text-white transition-colors">Aether Core</a></Tooltip></li>
            <li><Tooltip text="Professional laboratory access"><a href="#" className="hover:text-white transition-colors text-aether-cyan">Studio Program</a></Tooltip></li>
          </ul>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white mb-8 md:mb-10 opacity-40">Newsletter</h4>
            <div className="relative group">
              <input 
                type="text" 
                placeholder="EMAIL_ADDRESS"
                className="w-full bg-transparent border-b border-white/10 py-4 text-xs tracking-widest focus:outline-none focus:border-aether-cyan transition-colors placeholder:text-white/10"
              />
              <button className="absolute right-0 bottom-4 text-aether-cyan text-[10px] font-bold tracking-widest opacity-0 group-focus-within:opacity-100 transition-opacity">
                JOIN_CORE
              </button>
            </div>
          </div>
          
          <div className="mt-16 md:mt-20 lg:mt-0 flex flex-col gap-4 text-[9px] uppercase tracking-[0.3em] font-bold">
            <span className="opacity-20">© 2026 AETHER SYSTEMS CORP</span>
            <span className="opacity-20 uppercase">All Protocols Reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
