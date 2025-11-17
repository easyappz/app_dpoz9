import React, { useState } from 'react'
import { apiRegister } from '../../../api/auth'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (password !== password2) {
      setError('Пароли не совпадают')
      return
    }
    try {
      await apiRegister({ email, password })
      setSuccess('Регистрация прошла успешно. Теперь вы можете войти.')
      setEmail('')
      setPassword('')
      setPassword2('')
    } catch (err) {
      const msg = err?.response?.data?.detail || 'Ошибка регистрации. Возможно, email уже используется.'
      setError(msg)
    }
  }

  return (
    <div data-easytag="id1-src/components/Auth/Register/index.jsx" className="auth-page">
      <div className="auth-card">
        <h1 className="title">Регистрация</h1>
        <form onSubmit={onSubmit} className="form">
          <label className="label">Email</label>
          <input className="input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" required />
          <label className="label">Пароль</label>
          <input className="input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Минимум 6 символов" required />
          <label className="label">Подтвердите пароль</label>
          <input className="input" type="password" value={password2} onChange={(e)=>setPassword2(e.target.value)} required />
          {error && <div className="alert error">{error}</div>}
          {success && <div className="alert success">{success}</div>}
          <button className="btn primary" type="submit">Создать аккаунт</button>
        </form>
      </div>
    </div>
  )
}
