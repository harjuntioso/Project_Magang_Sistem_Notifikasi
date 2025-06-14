import { createContext, useContext, useState, useEffect } from 'react';
import axiosClient from '../axiosClient';

const AuthContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, _setUser] = useState(JSON.parse(localStorage.getItem('USER')) || null);
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN') || null);
  const [loading, setLoading] = useState(true);

  const setUser = (userData) => {
    _setUser(userData);
    if (userData) {
      localStorage.setItem('USER', JSON.stringify(userData));
    } else {
      localStorage.removeItem('USER');
    }
  };

  const setToken = (userToken) => {
    _setToken(userToken);
    if (userToken) {
      localStorage.setItem('ACCESS_TOKEN', userToken);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  };

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
  };

  const logout = async () => {
    try {
      await axiosClient.post('/logout');
    } catch (error) {
      console.error('Error during logout request:', error);
    } finally {
      setUser(null);
      setToken(null);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('ACCESS_TOKEN');
    const storedUser = localStorage.getItem('USER');

    if (storedToken && !user) {
      axiosClient.get('/user')
        .then(({ data }) => {
          setUser(data);
        })
        .catch((error) => {
          console.error('Failed to fetch user data with existing token:', error);
          setToken(null);
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl text-gray-700">Memuat sesi...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}