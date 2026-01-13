import React, { useState, useMemo } from 'react';
import { STAGES_DATA } from '../../data/initialData';
import { getStageTitle, calculatePoints } from '../../utils/helpers';
import { Medal, Clock, Eye, Flag, Trophy } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export function Leaderboard({ results }) {
  const [filterStage, setFilterStage] = useState('all');
  const [viewPhoto, setViewPhoto] = useState(null);

  const leaderboardData = useMemo(() => {
    if (filterStage === 'all') {
      // CLASSIFICAÇÃO GERAL (Soma de Pontos)
      // Aqui calculamos o campeão somando pontos de todas as etapas
      const athletePoints = {};

      // 1. Calcula pontos para cada etapa individualmente first
      STAGES_DATA.forEach(stage => {
        const stageResults = results
          .filter(r => r.stageId === stage.id)
          .sort((a, b) => a.seconds - b.seconds);
        
        stageResults.forEach((result, index) => {
          const points = calculatePoints(index + 1);
          if (!athletePoints[result.name]) {
            athletePoints[result.name] = { 
              name: result.name, 
              totalPoints: 0, 
              stages: 0,
              lastPhoto: result.photo // Keep reference to a photo
            };
          }
          athletePoints[result.name].totalPoints += points;
          athletePoints[result.name].stages += 1;
        });
      });

      // 2. Converte o objeto para array e ordena por TOTAL DE PONTOS
      // Quem tiver mais pontos fica no topo
      return Object.values(athletePoints)
        .sort((a, b) => b.totalPoints - a.totalPoints)
        .map((item, index) => ({
          ...item,
          id: `general-${index}`,
          displayValue: `${item.totalPoints} pts`,
          isGeneral: true // Flag para saber que é a visão geral
        }));
    } else {
      // CLASSIFICAÇÃO POR ETAPA (Baseado em Tempo)
      // Se tiver uma etapa selecionada, o critério é quem foi mais rápido
      return results
        .filter(athlete => athlete.stageId === parseInt(filterStage))
        .sort((a, b) => a.seconds - b.seconds)
        .map((item, index) => ({
          ...item,
          points: calculatePoints(index + 1), // Calcula pontos da posição
          displayValue: item.time,
          isGeneral: false
        }));
    }
  }, [results, filterStage]);

  return (
    <section id="ranking" className="py-24 bg-zinc-900/30 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black uppercase mb-4 italic tracking-tighter text-zinc-100">
            <span className="text-yellow-400">RANKING</span>
          </h2>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-800 text-zinc-400 text-xs font-bold uppercase tracking-widest border border-zinc-700/50">
            <Clock size={14} /> Classificação Oficial
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-10 overflow-x-auto pb-4 scrollbar-hide">
          <button 
            onClick={() => setFilterStage('all')}
            className={clsx(
              "flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap border",
              filterStage === 'all' 
                ? "bg-yellow-400 text-black border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.3)]" 
                : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:border-zinc-700 hover:text-zinc-300"
            )}
          >
            <Trophy size={16} /> Geral
          </button>
          {STAGES_DATA.map((stage) => (
            <button 
              key={stage.id}
              onClick={() => setFilterStage(stage.id.toString())}
              className={clsx(
                "flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap border",
                filterStage === stage.id.toString() 
                  ? "bg-yellow-400 text-black border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.3)]" 
                  : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:border-zinc-700 hover:text-zinc-300"
              )}
            >
              <Flag size={16} /> {getStageTitle(STAGES_DATA, stage.id)}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/50">
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-center w-20">Pos</th>
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Atleta</th>
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-center">
                    {filterStage === 'all' ? 'Etapas' : 'Etapa'}
                  </th>
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-center">
                    {filterStage === 'all' ? 'Pontos Totais' : 'Tempo'}
                  </th>
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-center">Info</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                <AnimatePresence mode='popLayout'>
                  {leaderboardData.length > 0 ? (
                    leaderboardData.map((item, index) => (
                      <motion.tr 
                        key={item.id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group hover:bg-zinc-800/30 transition-colors"
                      >
                        <td className="px-6 py-6 text-center">
                          <div className={clsx(
                            "inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm transition-all",
                            index === 0 ? "bg-yellow-400 text-black ring-4 ring-yellow-400/20 scale-110" : "bg-zinc-800 text-zinc-400"
                          )}>
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-6">
                           <div className="flex flex-col">
                              <span className={clsx("font-bold text-zinc-100", index === 0 && "text-xl")}>{item.name}</span>
                              {index === 0 && (
                                <span className="text-[10px] uppercase font-black text-yellow-400 tracking-tighter italic flex items-center gap-1 mt-1">
                                  <Trophy size={10}/> Líder
                                </span>
                              )}
                           </div>
                        </td>
                        <td className="px-6 py-6 text-center text-zinc-400">
                          {item.isGeneral ? (
                            <span className="text-zinc-500 text-xs font-medium">{item.stages} disputa(s)</span>
                          ) : (
                            <span className="inline-block px-2 py-1 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-[10px] font-bold uppercase tracking-tighter">
                              {getStageTitle(STAGES_DATA, item.stageId)}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-6 text-center">
                          <span className={clsx(
                            "font-mono font-bold",
                            item.isGeneral ? "text-yellow-400 text-xl" : "text-zinc-100 text-lg"
                          )}>
                            {item.displayValue}
                          </span>
                        </td>
                        <td className="px-6 py-6 text-center">
                          {!item.isGeneral ? (
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-xs font-bold text-yellow-400/80">+{item.points} pts</span>
                              {item.photo && (
                                <button onClick={() => setViewPhoto(item.photo)} className="text-zinc-500 hover:text-yellow-400 transition-colors bg-zinc-800/50 p-2 rounded-full border border-zinc-700/50" title="Ver Comprovante">
                                  <Eye size={14} />
                                </button>
                              )}
                            </div>
                          ) : (
                            <div className="text-center">
                              <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-wider">-</span>
                            </div>
                          )}
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-zinc-500 font-medium">Nenhum resultado registrado para este filtro ainda.</td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal de Comprovante */}
        <AnimatePresence>
        {viewPhoto && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm" 
            onClick={() => setViewPhoto(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-lg w-full bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800" 
              onClick={e => e.stopPropagation()}
            >
              <img src={viewPhoto} alt="Comprovante" className="w-full h-auto max-h-[65vh] object-contain bg-black" />
              <div className="p-8 text-center border-t border-zinc-800">
                <h3 className="font-bold uppercase mb-4 text-zinc-200 tracking-tight">Registro do Atleta</h3>
                <button onClick={() => setViewPhoto(null)} className="w-full bg-zinc-100 text-black py-4 rounded-2xl font-bold uppercase text-xs hover:bg-white transition-colors">Fechar Galeria</button>
              </div>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </section>
  );
}
