import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiLogin } from '../../../api/auth'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const { data } = await apiLogin({ email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('member', JSON.stringify(data.member))
      navigate('/profile')
    } catch (err) {
      const msg = err?.response?.data?.detail || 'Неверный email или пароль'
      setError(msg)
    }
  }

  return (
    <div data-easytag="id1-src/components/Auth/Login/index.jsx" className="auth-page">
      <div className="auth-card">
        <h1 className="title">Авторизация</h1>
        <form onSubmit={onSubmit} className="form">
          <label className="label">Email</label>
          <input className="input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" required />
          <label className="label">Пароль</label>
          <input className="input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          {error && <div className="alert error">{error}</div>}
          <button className="btn primary" type="submit">Войти</button>
        </form>
      </div>
    </div>
  )
}
