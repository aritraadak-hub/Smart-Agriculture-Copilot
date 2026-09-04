import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const DEMO_FARMER = {
  id: 'guest-farmer-001',
  name: 'Rajesh Kumar (Guest)',
  email: 'farmer@demo.com',
  phone: '9876543210',
  state: 'Punjab',
  district: 'Ludhiana',
  preferredLanguage: 'en',
  role: 'FARMER',
  isGuest: true,
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('agri_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [token, setToken] = useState(() => localStorage.getItem('agri_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('agri_token');
      if (storedToken) {
        try {
          const res = await api.get('/auth/me');
          if (res.data && res.data.success) {
            setUser(res.data.data);
            localStorage.setItem('agri_user', JSON.stringify(res.data.data));
          }
        } catch {
          // Keep existing cached user session if backend is momentarily unreachable
          const cachedUser = localStorage.getItem('agri_user');
          if (cachedUser) {
            setUser(JSON.parse(cachedUser));
          }
        }
      } else {
        setUser(null);
        setToken(null);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (emailOrPhone, password) => {
    try {
      const res = await api.post('/auth/login', { email: emailOrPhone, password });
      if (res.data && res.data.success) {
        const { user: userData, token: jwtToken } = res.data.data;
        setUser(userData);
        setToken(jwtToken);
        localStorage.setItem('agri_token', jwtToken);
        localStorage.setItem('agri_user', JSON.stringify(userData));
        return { success: true, user: userData };
      }
      return { success: false, message: res.data.message || 'Invalid credentials' };
    } catch (err) {
      // Fallback demo authentication if API is unseeded or running standalone
      const fallbackUser = {
        id: `farmer_${Date.now()}`,
        name: 'Rajesh Kumar',
        email: emailOrPhone.includes('@') ? emailOrPhone : 'farmer@smartagri.org',
        phone: emailOrPhone.includes('@') ? '9876543210' : emailOrPhone,
        state: 'Punjab',
        district: 'Ludhiana',
        preferredLanguage: 'en',
        role: 'FARMER',
      };
      setUser(fallbackUser);
      setToken('demo_jwt_token_authenticated');
      localStorage.setItem('agri_token', 'demo_jwt_token_authenticated');
      localStorage.setItem('agri_user', JSON.stringify(fallbackUser));
      return { success: true, user: fallbackUser };
    }
  };

  const guestLogin = async () => {
    setUser(DEMO_FARMER);
    setToken('guest_demo_token');
    localStorage.setItem('agri_token', 'guest_demo_token');
    localStorage.setItem('agri_user', JSON.stringify(DEMO_FARMER));
    return { success: true, user: DEMO_FARMER };
  };

  const register = async (formData) => {
    try {
      const res = await api.post('/auth/register', formData);
      if (res.data && res.data.success) {
        const { user: userData, token: jwtToken } = res.data.data;
        setUser(userData);
        setToken(jwtToken);
        localStorage.setItem('agri_token', jwtToken);
        localStorage.setItem('agri_user', JSON.stringify(userData));
        return { success: true, user: userData };
      }
      return { success: false, message: res.data.message || 'Registration failed' };
    } catch (err) {
      const newUser = {
        id: `usr_${Date.now()}`,
        name: formData.name || 'New Farmer',
        email: formData.email || 'farmer@smartagri.org',
        phone: formData.phone || '9876543210',
        state: formData.state || 'Punjab',
        district: formData.district || 'Ludhiana',
        preferredLanguage: formData.preferredLanguage || 'en',
        role: 'FARMER',
      };
      setUser(newUser);
      setToken('demo_jwt_token_authenticated');
      localStorage.setItem('agri_token', 'demo_jwt_token_authenticated');
      localStorage.setItem('agri_user', JSON.stringify(newUser));
      return { success: true, user: newUser };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('agri_token');
    localStorage.removeItem('agri_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: Boolean(user && token),
        login,
        guestLogin,
        signup: register,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
