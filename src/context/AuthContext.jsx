import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // 'users' guarda todos usuarios cadastrados no navegador
  const [users, setUsers] = useLocalStorage('cr_users', []);
  // 'currentUser' guarda quem está logado no momento
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ao abrir o site, verifica se já existe uma sessão salva
    const sessionUser = localStorage.getItem('cr_session');
    if (sessionUser) {
      setCurrentUser(JSON.parse(sessionUser));
    }
    setLoading(false);
  }, []);

  // Função de Login
  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('cr_session', JSON.stringify(user)); // Salva sessão
      return { success: true };
    }
    return { success: false, error: 'Email ou senha inválidos' };
  };

  // Função de Cadastro
  const register = (userData) => {
    if (users.find(u => u.email === userData.email)) {
      return { success: false, error: 'Email já cadastrado' };
    }
    
    const newUser = { ...userData, id: Date.now() };
    const updatedUsers = [...users, newUser];
    
    setUsers(updatedUsers); // Salva novo usuário no banco (localStorage)
    
    // Auto login: loga o usuário assim que ele cadastra
    setCurrentUser(newUser);
    localStorage.setItem('cr_session', JSON.stringify(newUser));
    
    return { success: true };
  };

  // Função de Logout
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('cr_session');
  };

  const value = {
    currentUser,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
