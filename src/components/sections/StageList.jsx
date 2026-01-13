import React from 'react';
import { STAGES_DATA } from '../../data/initialData';
import { Calendar, ExternalLink, Lock } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

function StageCard({ stage, index }) {
  const isLocked = stage.status === 'locked';

  const handleRegister = () => {
    window.open("https://www.mercadopago.com.br", "_blank");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={clsx(
        "group relative rounded-3xl p-1 overflow-hidden transition-all duration-500",
        isLocked ? "grayscale opacity-60" : "hover:scale-[1.02]"
      )}
    >
      <div className={clsx(
        "absolute inset-0 bg-gradient-to-br transition-opacity",
        !isLocked 
          ? "from-yellow-400 to-cyan-500 opacity-20 group-hover:opacity-40" 
          : "from-zinc-800 to-zinc-900 opacity-50"
      )}></div>
      
      <div className="relative bg-zinc-900 rounded-[22px] p-8 h-full flex flex-col border border-zinc-800/50 group-hover:border-yellow-500/30 transition-colors">
        <div className="flex justify-between items-start mb-6">
          <div className={clsx(
            "p-3 rounded-2xl",
            !isLocked ? "bg-yellow-400/10 text-yellow-400" : "bg-zinc-800 text-zinc-500"
          )}>
            <Calendar size={24} />
          </div>
          {isLocked && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-[10px] font-bold uppercase tracking-wider">
              <Lock size={12} /> Bloqueado
            </span>
          )}
        </div>
        
        <h3 className="text-2xl font-bold mb-2 uppercase tracking-tight text-zinc-100">{stage.title}</h3>
        <p className="text-zinc-400 text-sm mb-6 flex-grow">{stage.description}</p>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between text-sm py-3 border-y border-zinc-800/50">
            <span className="text-zinc-500">Mês da Prova</span>
            <span className="font-semibold text-zinc-200">{stage.month}</span>
          </div>
          
          {!isLocked ? (
            <button 
              onClick={handleRegister} 
              className="w-full bg-zinc-100 hover:bg-white text-black py-4 rounded-2xl font-bold transition-colors flex items-center justify-center gap-2"
            >
              Inscrever-se <ExternalLink size={18} />
            </button>
          ) : (
            <button disabled className="w-full bg-zinc-800 text-zinc-500 py-4 rounded-2xl font-bold cursor-not-allowed uppercase text-xs border border-zinc-700/50">
              Abre em {new Date(stage.releaseDate).toLocaleDateString()}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function StageList() {
  return (
    <section id="etapas" className="py-24 bg-zinc-900/30">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-black uppercase tracking-tight mb-12 text-zinc-100"
        >
          Etapas do Circuito
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STAGES_DATA.map((stage, index) => (
            <StageCard key={stage.id} stage={stage} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
