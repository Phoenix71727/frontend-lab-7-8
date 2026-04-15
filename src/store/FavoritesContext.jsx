/* Контекст улюблених позицій (Favorites)
  Цей файл створює "глобальне сховище" для ID товарів, які користувач позначив сердечком.
*/

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'

// Ключ, під яким масив ID буде зберігатися в пам'яті браузера (localStorage)
const KEY = 'inventory-favorites'

// Створюємо сам об'єкт контексту
const FavoritesContext = createContext(null)

/**
 * Допоміжна функція для читання даних з localStorage при завантаженні додатка.
 * Оскільки localStorage зберігає лише рядки, ми використовуємо JSON.parse для перетворення назад у масив.
 */
function readFromStorage() {
  try {
    const value = localStorage.getItem(KEY)
    // Якщо дані є — парсимо їх, якщо немає — повертаємо порожній масив []
    return value ? JSON.parse(value) : []
  } catch {
    // У разі помилки (наприклад, пошкоджені дані) повертаємо порожній масив
    return []
  }
}

/**
 * Провайдер контексту - компонент, який "огортає" весь додаток (в App.jsx або main.jsx),
 * щоб надати доступ до функцій улюблених будь-якому іншому компоненту.
 */
export function FavoritesProvider({ children }) {
  // Ініціалізуємо стан масивом ID, прочитаним із localStorage
  const [favoriteIds, setFavoriteIds] = useState(() => readFromStorage())

  /**
   * useEffect: Спрацьовує щоразу, коли масив favoriteIds змінюється.
   * Він автоматично записує оновлений масив у localStorage, перетворюючи його на рядок.
   */
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(favoriteIds))
  }, [favoriteIds])

  /**
   * Функція toggleFavorite: додає ID до списку, якщо його там немає, 
   * або видаляє його, якщо він вже там є (логіка перемикача).
   */
  const toggleFavorite = (id) => {
    setFavoriteIds((current) => {
      if (current.includes(id)) {
        // Якщо вже є — фільтруємо масив, залишаючи всі елементи, крім цього id
        return current.filter((itemId) => itemId !== id)
      }
      // Якщо немає — створюємо новий масив, додаючи цей id в кінець
      return [...current, id]
    })
  }

  /**
   * Функція removeFavorite: примусове видалення ID.
   * Використовується, наприклад, коли адмін видалив товар з бази, і нам треба витерти його з улюблених.
   */
  const removeFavorite = (id) => {
    setFavoriteIds((current) => current.filter((itemId) => itemId !== id))
  }

  // Перевірка: чи є конкретний id у списку обраних (повертає true/false)
  const isFavorite = (id) => favoriteIds.includes(id)

  // Об'єкт зі значеннями та функціями, який ми роздаємо через контекст
  const value = { favoriteIds, toggleFavorite, removeFavorite, isFavorite }

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

/**
 * Кастомний хук для зручного доступу до контексту в компонентах.
 * Перевіряє, чи не намагаємося ми використати контекст поза FavoritesProvider.
 */
export function useFavoritesContext() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavoritesContext must be used within FavoritesProvider')
  }
  return context
}