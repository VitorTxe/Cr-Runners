import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';

export function Hero() {
  return (
    <header className="relative py-24 overflow-hidden text-center px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-400/10 via-zinc-950/0 to-transparent"></div>
      
      <div className="relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-yellow-400/30 bg-yellow-400/5 text-yellow-400 text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-[0_0_10px_rgba(250,204,21,0.1)]">
            Temporada 2025 • Aberta
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-7xl font-black uppercase mb-6 tracking-tighter leading-none text-zinc-100"
        >
          Supere seus <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-cyan-400 filter drop-shadow-[0_0_20px_rgba(250,204,21,0.2)]">
            Próprios Limites
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-2xl mx-auto text-zinc-400 text-lg mb-10"
        >
          Corra onde quiser, comprove seu tempo e suba no pódio nacional.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a href="#etapas">
            <Button className="px-8 py-4 text-lg">
              Inscreva-se Agora <ChevronRight size={20} />
            </Button>
          </a>
        </motion.div>
      </div>
    </header>
  );
}
