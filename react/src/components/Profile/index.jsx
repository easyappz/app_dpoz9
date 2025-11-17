import React, { useEffect, useState } from 'react'
import { apiGetProfile, apiUpdateProfile } from '../../api/profile'

export default function Profile() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    let mounted = true
    setLoading(true)
    apiGetProfile()
      .then(({ data }) => {
        if (!mounted) return
        setEmail(data.email)
      })
      .catch(() => setError('Не удалось загрузить профиль'))
      .finally(() => setLoading(false))
    return () => { mounted = false }
  }, [])

  const onSave = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      const { data } = await apiUpdateProfile({ email })
      setEmail(data.email)
      setSuccess('Профиль обновлён')
    } catch (err) {
      setError('Ошибка при сохранении')
    }
  }

  if (loading) return <div data-easytag="id1-src/components/Profile/index.jsx" className="page"><div className="auth-card"><div className="title">Загрузка...</div></div></div>

  return (
    <div data-easytag="id1-src/components/Profile/index.jsx" className="page">
      <div className="auth-card">
        <h1 className="title">Профиль</h1>
        <form onSubmit={onSave} className="form">
          <label className="label">Email</label>
          <input className="input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          {error && <div className="alert error">{error}</div>}
          {success && <div className="alert success">{success}</div>}
          <button className="btn primary" type="submit">Сохранить</button>
        </form>
      </div>
    </div>
  )
}
