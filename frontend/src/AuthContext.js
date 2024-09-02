import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { token, login, register, logout } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
