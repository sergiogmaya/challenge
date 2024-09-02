import { useState } from 'react';

//hook para manejar las llamadas a las rutas de usuarios
export const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem('token')); //obtenemos el token del navegador para usarlo en las llamadas
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //funcion de acceso del usuario
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {  //si la respuesta es positiva, almacenamos el token
        setToken(data.token);
        localStorage.setItem('token', data.token);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Login failed, please try again.');
    } finally {
      setLoading(false);
    }
  };

  //Funcion de registro del usuario
  const register = async (user) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed, please try again.');
      }
    } catch (err) {
      setError('Registration failed, please try again.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return {
    token,
    error,
    loading,
    login,
    register,
    logout,
  };
};
