/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'

const KEY = 'inventory-favorites'
const FavoritesContext = createContext(null)

function readFromStorage() {
  try {
    const value = localStorage.getItem(KEY)
    return value ? JSON.parse(value) : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState(() => readFromStorage())

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(favoriteIds))
  }, [favoriteIds])

  const toggleFavorite = (id) => {
    setFavoriteIds((current) => {
      if (current.includes(id)) {
        return current.filter((itemId) => itemId !== id)
      }
      return [...current, id]
    })
  }

  const removeFavorite = (id) => {
    setFavoriteIds((current) => current.filter((itemId) => itemId !== id))
  }

  const isFavorite = (id) => favoriteIds.includes(id)

  const value = { favoriteIds, toggleFavorite, removeFavorite, isFavorite }

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavoritesContext() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavoritesContext must be used within FavoritesProvider')
  }
  return context
}
