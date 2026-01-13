import React from 'react';
import { LOGO_URL } from '../../data/initialData';

export function Footer() {
  return (
    <footer className="py-20 border-t border-zinc-800 text-center bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-6">
        <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
          <div className="bg-zinc-900 border border-zinc-800 p-1 rounded-lg w-10 h-10 flex items-center justify-center overflow-hidden">
            <img 
              src={LOGO_URL} 
              alt="Logo Footer" 
              className="w-full h-full object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all"
            />
          </div>
          <span className="font-bold text-xl tracking-tighter uppercase text-zinc-100">
            Circuito<span className="text-yellow-400"> Cr</span>
          </span>
        </div>
        <p className="text-zinc-500 text-sm max-w-sm">
          Sua jornada para a alta performance começa aqui. Junte-se a milhares de atletas.
        </p>
        <div className="mt-8 pt-8 border-t border-zinc-900 w-full text-zinc-600 text-xs uppercase tracking-widest">
          © 2025 • Circuito Pro Racing
        </div>
      </div>
    </footer>
  );
}
