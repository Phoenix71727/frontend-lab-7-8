// Імпортуємо useState для керування станом завантаження (busy) та помилок
import { useState } from 'react'
// useNavigate — це хук для програмного переходу між сторінками (реRedirect)
import { useNavigate } from 'react-router-dom'

// Імпортуємо необхідні компоненти: навігацію та універсальну форму
import { TopNav } from '../components/TopNav.jsx'
import { InventoryForm } from '../components/inventory/InventoryForm.jsx'

// Імпортуємо функцію для POST запиту до API
import { createInventoryItem } from '../services/inventoryApi.js'
// Імпортуємо контекст, щоб оновити глобальний список товарів після додавання нового
import { useInventory } from '../store/InventoryContext.jsx'

export function AdminInventoryCreate() {
  // Ініціалізуємо функцію навігації
  const navigate = useNavigate()
  // Дістаємо функцію refreshInventory, щоб актуалізувати дані в усьому додатку
  const { refreshInventory } = useInventory()
  
  // Локальні стани для обробки процесу запиту
  const [busy, setBusy] = useState(false) // Блокує кнопку під час відправки
  const [error, setError] = useState('') // Зберігає текст помилки від сервера

  // Функція-обробник, яку ми передаємо у форму
  const handleCreate = async (payload) => {
    setBusy(true)
    setError('')

    try {
      // 1. Надсилаємо дані (текст + фото) на бекенд
      await createInventoryItem(payload)
      
      try {
        // 2. Спробуємо оновити глобальний список інвентарю відразу
        await refreshInventory()
      } catch {
        // Якщо оновлення списку не вдалося, це не критично, бо запис вже створено
      }

      // 3. Після успішного створення перенаправляємо адміна на головну сторінку таблиці
      navigate('/admin/inventory')
    } catch (err) {
      // Якщо сервер повернув помилку (наприклад, 400 або 500), виводимо її текст
      setError(err?.response?.data?.error || 'Не вдалося створити запис')
    } finally {
      // В будь-якому випадку знімаємо стан завантаження
      setBusy(false)
    }
  }

  return (
    <main className="page-shell">
      <TopNav />
      
      <h1 className="section-title">Додавання інвентарю</h1>
      <p className="section-subtitle">Створення нової позиції складу</p>
      
      {/* Виведення блоку з помилкою, якщо вона виникла під час запиту */}
      {error && <div className="state-box error">{error}</div>}
      
      {/* Використовуємо універсальну форму, передаючи їй функцію обробки */}
      <InventoryForm 
        submitLabel="Створити" 
        busy={busy} 
        onSubmit={handleCreate} 
      />
    </main>
  )
}