import { useState, useEffect } from 'react';

/**
 * Hook customizado para salvar dados no LocalStorage do navegador.
 * Funciona como um useState, mas os dados não somem ao recarregar a página.
 * 
 * @param {string} key - Nome da chave onde será salvo no navegador (ex: 'cr_ranking')
 * @param {any} initialValue - Valor inicial caso não exista nada salvo ainda
 */
export function useLocalStorage(key, initialValue) {
  // 1. Inicializa o estado buscando no localStorage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Se achou, converte de JSON para Objeto, senão usa o valor inicial
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // 2. Sempre que o 'storedValue' mudar, salva no localStorage automaticamente
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
