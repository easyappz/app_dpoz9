import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import Profile from './components/Profile'
import './App.css'

function ProtectedRoute({ children }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const location = useLocation()
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return children
}

function AppShell() {
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.handleRoutes === 'function') {
      window.handleRoutes(["/", "/register", "/login", "/profile"])
    }
  }, [])

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const onLogout = () => {
    try { localStorage.removeItem('token'); localStorage.removeItem('member') } catch (e) {}
    // No API logout here to keep header stateless. The Profile page has save and could include logout button too.
    window.location.href = '/'
  }

  return (
    <div data-easytag="id1-src/App.jsx">
      <header className="app-header">
        <div className="logo">Easyappz</div>
        <nav className="nav">
          <Link to="/">Главная</Link>
          {!token && <Link to="/register">Регистрация</Link>}
          {!token && <Link to="/login">Вход</Link>}
          {token && <Link to="/profile">Профиль</Link>}
          {token && <button onClick={onLogout}>Выход</button>}
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
