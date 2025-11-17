import api from './axios'

export const apiGetProfile = () => api.get('/api/profile')
export const apiUpdateProfile = (data) => api.put('/api/profile', data)
