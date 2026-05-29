import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const listingApi = {
  getAll: () => api.get('/listings/'),
  getById: (id) => api.get(`/listings/${id}/`),
  updateStatus: (id, status) => api.patch(`/listings/${id}/`, { status }),
}

export default api