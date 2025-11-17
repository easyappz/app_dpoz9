import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

import { Home } from './components/Home';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Profile from './components/Profile';
import { apiLogout } from './api/auth';

function App() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(() => {
    try { return Boolean(localStorage.getItem('token')); } catch { return false; }
  });

  /** Никогда не удаляй этот код */
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.handleRoutes === 'function') {
      /** Нужно передавать список существующих роутов */
      window.handleRoutes(['/', '/register', '/login', '/profile']);
    }
  }, []);

  const handleLogout = async () => {
    try { await apiLogout(); } catch (e) { /* ignore */ }
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('member');
    } catch (e) { /* ignore */ }
    setIsAuth(false);
    navigate('/login');
  };

  useEffect(() => {
    const onStorage = () => setIsAuth(Boolean(localStorage.getItem('token')));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <ErrorBoundary>
      <div data-easytag="id1-src/App.jsx">
        <header className="app-header">
          <div className="brand">Simple Auth</div>
          <nav className="nav">
            <Link to="/">Главная</Link>
            {!isAuth && <Link to="/register">Регистрация</Link>}
            {!isAuth && <Link to="/login">Вход</Link>}
            {isAuth && <Link to="/profile">Профиль</Link>}
            {isAuth && <button onClick={handleLogout}>Выход</button>}
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;
