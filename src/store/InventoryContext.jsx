/* Контекст інвентарю (Inventory Context)
  Цей файл створює централізоване сховище даних. 
  Замість того, щоб кожна сторінка окремо завантажувала дані, це робить Контекст один раз, 
  а потім "роздає" готовий масив усім компонентам.
*/

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
// Імпортуємо функцію для отримання даних з нашого API сервісу
import { fetchInventory } from '../services/inventoryApi.js'

// Створюємо порожній об'єкт контексту
const InventoryContext = createContext(null)

/**
 * Провайдер інвентарю - компонент-обгортка.
 * Він завантажує дані з сервера і зберігає їх у своєму стані.
 */
export function InventoryProvider({ children }) {
  // Головний масив товарів
  const [items, setItems] = useState([])
  // Стан завантаження (true, поки чекаємо відповідь від бекенду)
  const [loading, setLoading] = useState(true)
  // Текст помилки, якщо запит не вдався
  const [error, setError] = useState('')

  /**
   * Функція для завантаження або оновлення списку інвентарю.
   * Вона оголошена як асинхронна (async), бо чекає відповіді від мережі.
   */
  const refreshInventory = async () => {
    setLoading(true) // Включаємо індикатор завантаження
    setError('')     // Очищуємо попередні помилки

    try {
      // Викликаємо функцію з сервісу api
      const result = await fetchInventory()
      // Перевіряємо, чи отримали ми масив, і записуємо його в стан
      setItems(Array.isArray(result) ? result : [])
    } catch (err) {
      // Якщо сталася помилка (напр. сервер вимкнений), записуємо її текст для UI
      setError(err?.response?.data?.error || 'Не вдалося завантажити інвентар')
    } finally {
      // Вимикаємо індикатор завантаження незалежно від результату
      setLoading(false)
    }
  }

  /**
   * useEffect з порожнім масивом залежностей []
   * Це означає: "виконай цю функцію лише один раз, коли користувач вперше відкрив сайт".
   */
  useEffect(() => {
    refreshInventory()
  }, [])

  // Об'єкт, який буде доступний іншим компонентам
  const value = {
    items,            // Список товарів
    loading,          // Чи йде завантаження
    error,            // Помилка
    refreshInventory, // Функція для примусового оновлення даних
  }

  /* Повертаємо Провайдер, який "прокидає" об'єкт value всім дочірнім компонентам (children) */
  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>
}

/**
 * Кастомний хук useInventory.
 * Дозволяє іншим файлам писати просто: const { items } = useInventory();
 * замість складних конструкцій з useContext.
 */
export function useInventory() {
  const context = useContext(InventoryContext)
  // Захист: якщо ми забули огорнути App у Провайдер, React видасть зрозумілу помилку
  if (!context) {
    throw new Error('useInventory must be used within InventoryProvider')
  }
  return context
}