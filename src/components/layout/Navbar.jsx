import React, { useState } from 'react';
import { LOGO_URL } from '../../data/initialData';
import logo from '../../assets/cr_logo.png';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../auth/AuthModal';
import { LogOut, User } from 'lucide-react';

export function Navbar() {
  const { currentUser, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <nav className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className=" p-1 rounded-lg w-12 h-12 flex items-center justify-center overflow-hidden">
              <img
                src={logo}
                alt="Logo do Circuito"
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => { e.target.src = "https://via.placeholder.com/40?text=C"; }}
              />
            </div>
            <span className="font-bold text-xl tracking-tighter uppercase text-zinc-100">
              Circuito<span className="text-yellow-400"> Cr</span>
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest text-zinc-400">
            <a href="#etapas" className="hover:text-yellow-400 transition-colors">Etapas</a>
            <a href="#resultado" className="hover:text-yellow-400 transition-colors">Enviar Tempo</a>
            <a href="#ranking" className="hover:text-yellow-400 transition-colors">Ranking</a>
          </div>
          
          {currentUser ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700 text-yellow-400">
                  <User size={16} />
                </div>
                <span className="hidden sm:inline font-semibold text-zinc-200">{currentUser.name.split(' ')[0]}</span>
              </div>
              <button 
                onClick={logout}
                className="bg-zinc-800/50 hover:bg-red-500/10 hover:text-red-400 text-zinc-400 p-2 rounded-full transition-all border border-zinc-700/50 hover:border-red-500/30"
                title="Sair"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-4 py-2 rounded-full text-sm font-semibold transition-all border border-zinc-700/50 hover:border-yellow-400/30"
            >
              Minha Conta
            </button>
          )}
        </div>
      </nav>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}
