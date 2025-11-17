import api from './axios'

export const apiRegister = (payload) => api.post('/api/auth/register', payload)
export const apiLogin = (payload) => api.post('/api/auth/login', payload)
export const apiLogout = () => api.post('/api/auth/logout')
