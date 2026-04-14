import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
})

export const fetchInventory = async () => {
  const { data } = await api.get('/inventory')
  return data
}

export const fetchInventoryById = async (id) => {
  const { data } = await api.get(`/inventory/${id}`)
  return data
}

export const createInventoryItem = async ({ inventory_name, description, photo }) => {
  const formData = new FormData()
  formData.append('inventory_name', inventory_name)
  formData.append('description', description || '')
  if (photo) {
    formData.append('photo', photo)
  }

  const { data } = await api.post('/register', formData)
  return data
}

export const updateInventoryItem = async (id, payload) => {
  const { data } = await api.put(`/inventory/${id}`, payload)
  return data
}

export const updateInventoryPhoto = async (id, photo) => {
  const formData = new FormData()
  formData.append('photo', photo)
  const { data } = await api.put(`/inventory/${id}/photo`, formData)
  return data
}

export const deleteInventoryItem = async (id) => {
  const { data } = await api.delete(`/inventory/${id}`)
  return data
}

export const getPhotoUrl = (item) => {
  if (!item) {
    return ''
  }

  if (item.photo && item.photo.startsWith('http')) {
    return item.photo
  }

  const path = item.photo || `/inventory/${item.id}/photo`
  const base = import.meta.env.VITE_API_BASE_URL || ''
  return `${base}${path}`
}
