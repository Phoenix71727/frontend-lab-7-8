/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import { fetchInventory } from '../services/inventoryApi.js'

const InventoryContext = createContext(null)

export function InventoryProvider({ children }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refreshInventory = async () => {
    setLoading(true)
    setError('')

    try {
      const result = await fetchInventory()
      setItems(Array.isArray(result) ? result : [])
    } catch (err) {
      setError(err?.response?.data?.error || 'Не вдалося завантажити інвентар')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshInventory()
  }, [])

  const value = {
    items,
    loading,
    error,
    refreshInventory,
  }

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>
}

export function useInventory() {
  const context = useContext(InventoryContext)
  if (!context) {
    throw new Error('useInventory must be used within InventoryProvider')
  }
  return context
}
