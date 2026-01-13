import React, { useState, useEffect } from 'react';
import { Timer, Upload, CheckCircle2, Flag, Lock } from 'lucide-react';
import { STAGES_DATA } from '../../data/initialData';
import { timeToSeconds } from '../../utils/helpers';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../auth/AuthModal';

export function ResultForm({ onNewResult }) {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({ name: '', stageId: '1', time: '', photo: null });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Efeito para preencher o nome automaticamente se o usuário estiver logado
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({ ...prev, name: currentUser.name }));
    }
  }, [currentUser]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => setFormData({ ...formData, photo: event.target.result });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Bloqueia envio se não estiver logado
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    // Validação de formato de tempo (Regex)
    if (!formData.time.match(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/)) {
      alert("Por favor, insira o tempo no formato HH:MM:SS");
      return;
    }

    const newResult = {
      id: Date.now(),
      name: formData.name, // Uses logged user name ideally, or edited one
      stageId: parseInt(formData.stageId),
      time: formData.time,
      seconds: timeToSeconds(formData.time),
      photo: formData.photo || "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&q=80&w=400"
    };

    onNewResult(newResult);
    // Reset form but keep name if logged in
    setFormData({ ...formData, time: '', photo: null });
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <>
      <section id="resultado" className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-8 md:p-12 relative overflow-hidden group hover:border-yellow-500/20 transition-colors">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Timer size={120} />
            </div>
            
            <div className="text-center mb-10 relative z-10">
              <h2 className="text-3xl font-black uppercase mb-2 text-zinc-100">Enviar Resultado</h2>
              <p className="text-zinc-500">Concluiu sua corrida? Submeta seu comprovante abaixo.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {/* Overlay blocking interaction if not logged in - Optional, or just change button behavior */}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 ml-1">Selecione a Etapa</label>
                  <div className="relative">
                    <Flag className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <select 
                      value={formData.stageId} 
                      onChange={(e) => setFormData({...formData, stageId: e.target.value})} 
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 pl-12 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 appearance-none text-zinc-200 font-semibold cursor-pointer"
                      disabled={!currentUser}
                    >
                      {STAGES_DATA.map(stage => <option key={stage.id} value={stage.id}>{stage.title}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 ml-1">Nome Completo</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all text-zinc-100 placeholder:text-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed" 
                    placeholder="Nome no ranking"
                    disabled={!currentUser} 
                    readOnly={!!currentUser} // Optional: Lock name to account name
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 ml-1">Tempo (HH:MM:SS)</label>
                  <div className="relative">
                    <Timer className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <input 
                      required 
                      type="text" 
                      value={formData.time} 
                      onChange={(e) => setFormData({...formData, time: e.target.value})} 
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 pl-12 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 font-mono text-zinc-100 placeholder:text-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed" 
                      placeholder="00:00:00"
                      disabled={!currentUser} 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 ml-1">Foto Comprovante</label>
                  <label className={`w-full bg-zinc-950 border-2 border-dashed border-zinc-800 rounded-2xl p-4 flex items-center justify-center gap-2 transition-all text-zinc-400 text-sm ${currentUser ? 'cursor-pointer hover:bg-zinc-800/50 hover:border-yellow-500/50' : 'opacity-50 cursor-not-allowed'}`}>
                    <Upload size={18} className="text-yellow-400" /> 
                    <span className="truncate max-w-[200px]">{formData.photo ? "Arquivo Selecionado" : "Anexar Foto"}</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={!currentUser} />
                  </label>
                </div>
              </div>
              
              {currentUser ? (
                <Button type="submit" className="w-full py-5 text-lg">
                  Enviar Resultado Oficial
                </Button>
              ) : (
                <button 
                  type="button" 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white py-5 rounded-2xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Lock size={20} /> Faça login para participar
                </button>
              )}
              
              {isSuccess && (
                <div className="flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-2xl text-cyan-400 justify-center animate-pulse">
                  <CheckCircle2 size={20} /> <span className="font-semibold text-sm">Sucesso! Seu tempo foi registrado.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}
