// Імпортуємо стандартні хуки React: useEffect для запитів при завантаженні та useState для збереження даних
import { useEffect, useState } from 'react'
// Link для повернення назад, useParams — щоб витягнути ID з URL-адреси (напр., /admin/inventory/5)
import { Link, useParams } from 'react-router-dom'

// Імпортуємо компоненти інтерфейсу
import { TopNav } from '../components/TopNav.jsx'
import { InventoryDetails } from '../components/inventory/InventoryDetails.jsx'

// Імпортуємо функцію для отримання одного предмета за його ID
import { fetchInventoryById } from '../services/inventoryApi.js'

export function AdminInventoryDetails() {
  // Витягуємо параметр 'id' з URL. Якщо шлях /admin/inventory/123, то id буде "123"
  const { id } = useParams()

  // Локальні стани сторінки
  const [item, setItem] = useState(null) // Дані предмета
  const [loading, setLoading] = useState(true) // Стан очікування відповіді від сервера
  const [error, setError] = useState('') // Текст помилки

  // useEffect спрацює один раз при монтуванні компонента або якщо зміниться id
  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        // Робимо асинхронний запит до API за конкретним ID
        const data = await fetchInventoryById(id)
        // Зберігаємо отримані дані в стан
        setItem(data)
      } catch {
        // Обробка випадку, якщо такого ID не існує або впав сервер
        setError('Позицію не знайдено або сервер недоступний')
      } finally {
        // В будь-якому випадку вимикаємо індикатор завантаження
        setLoading(false)
      }
    }

    load()
  }, [id]) // Залежність [id] гарантує перезавантаження даних, якщо користувач змінить ID в адресному рядку

  return (
    <main className="page-shell">
      <TopNav />
      
      <h1 className="section-title">Деталі інвентарю</h1>
      <p className="section-subtitle">Перегляд повної інформації</p>

      {/* Умовний рендеринг станів */}
      {loading && <div className="state-box">Завантаження...</div>}
      
      {!loading && error && <div className="state-box error">{error}</div>}
      
      {/* Якщо дані успішно завантажені — передаємо об'єкт item в компонент відображення */}
      {!loading && item && <InventoryDetails item={item} />}

      {/* Кнопка повернення до таблиці всіх товарів */}
      <div style={{ marginTop: 14 }}>
        <Link className="btn btn-secondary" to="/admin/inventory">
          Назад до списку
        </Link>
      </div>
    </main>
  )
}