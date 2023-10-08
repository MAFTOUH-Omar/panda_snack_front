import Cookies from 'js-cookie';
import React, { createContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import axios from "axios"

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get('token') || '');
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState(Cookies.get('fullName') || '');
  const [email, setEmail] = useState(Cookies.get('email') || '');
  const [role, setRole] = useState(Cookies.get('Role') || '');
  const [user_id, setUser_id] = useState(Cookies.get('user_id') || '');
  const [darkMode, setDarkMode] = useState(window.localStorage.getItem('darkMode'));

  const Logout = () => {
    setFullName('');
    setEmail('');
    setToken('');
    setRole('');
    setUser_id('');
    Cookies.remove('token', { path: '/' });
    Cookies.remove('fullName', { path: '/' });
    Cookies.remove('email', { path: '/' });
    Cookies.remove('Role', { path: '/' });
    Cookies.remove('user_id', { path: '/' });
  };

  const isTokenValid = () => {
    try {
      const decodedToken = jwt_decode(token);
      return !decodedToken.exp || decodedToken.exp > Date.now() / 1000;
    } catch (error) {
      return false;
    }
  };

  const toggleDarkMode = () => {
    if (darkMode === 'dark') {
      setDarkMode('light');
      window.localStorage.setItem('darkMode', 'light');
      document.documentElement.classList.remove('dark');
    } else {
      setDarkMode('dark');
      window.localStorage.setItem('darkMode', 'dark');
      document.documentElement.classList.add('dark');
    }
  };

  useEffect(() => {
    if (darkMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Check if token is valid
  useEffect(() => {
    if (token !== undefined && token !== '') {
      if (isTokenValid()) {
        setLoading(false);
      } else {
        Logout();
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ Logout , user_id , token, fullName, email, loading, role , toggleDarkMode , darkMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };