import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { StageList } from './components/sections/StageList';
import { ResultForm } from './components/sections/ResultForm';
import { Leaderboard } from './components/sections/Leaderboard';
import { Footer } from './components/layout/Footer';
import { useLocalStorage } from './hooks/useLocalStorage';
import { INITIAL_RANKING } from './data/initialData';

import { AuthProvider } from './context/AuthContext';

function App() {
  const [results, setResults] = useLocalStorage('racing_results', INITIAL_RANKING);

  const handleNewResult = (newResult) => {
    setResults(prev => [...prev, newResult]);
  };

  return (
    // AuthProvider envolve todo o app para que o usuário logado seja acessível em qualquer lugar
    <AuthProvider>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-yellow-400 selection:text-black scroll-smooth">
        <Navbar />
        <main>
          <Hero />
          <StageList />
          {/* ResultForm recebe a função para salvar novos resultados */}
          <ResultForm onNewResult={handleNewResult} />
          {/* Leaderboard recebe a lista completa de resultados para exibir */}
          <Leaderboard results={results} />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
