// Імпортуємо хуки для керування станом та життєвим циклом компонента
import { useEffect, useState } from 'react'
// useNavigate для програмного переходу, useParams для отримання ID з адресного рядка
import { useNavigate, useParams } from 'react-router-dom'

// Імпортуємо навігацію та універсальну форму
import { TopNav } from '../components/TopNav.jsx'
import { InventoryForm } from '../components/inventory/InventoryForm.jsx'

// Імпортуємо функції для роботи з API: отримання, оновлення тексту та оновлення фото
import {
  fetchInventoryById,
  updateInventoryItem,
  updateInventoryPhoto,
} from '../services/inventoryApi.js'
// Імпортуємо контекст для оновлення глобального списку після редагування
import { useInventory } from '../store/InventoryContext.jsx'

export function AdminInventoryEdit() {
  const { id } = useParams() // Отримуємо ID предмета з URL
  const navigate = useNavigate()
  const { refreshInventory } = useInventory()

  // Стани для даних предмета та процесу завантаження
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // Окремі стани busy для двох різних форм (текст і фото), щоб блокувати кнопки незалежно
  const [busyText, setBusyText] = useState(false)
  const [busyPhoto, setBusyPhoto] = useState(false)
  
  const [newPhoto, setNewPhoto] = useState(null) // Тимчасове сховище для вибраного файлу фото
  const [error, setError] = useState('') // Стан для помилок

  // Завантажуємо актуальні дані предмета при відкритті сторінки
  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await fetchInventoryById(id)
        setItem(data)
      } catch {
        setError('Не вдалося завантажити інвентар')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  // Обробник оновлення текстових полів (назва, опис)
  const handleUpdateText = async ({ inventory_name, description }) => {
    setBusyText(true)
    setError('')
    try {
      // Відправляємо PUT запит з JSON-даними
      await updateInventoryItem(id, { inventory_name, description })
      await refreshInventory() // Оновлюємо дані в контексті
      navigate(`/admin/inventory/${id}`) // Перенаправляємо на сторінку деталей
    } catch {
      setError('Не вдалося оновити текстові дані')
    } finally {
      setBusyText(false)
    }
  }

  // Обробник оновлення тільки фотографії
  const handleUpdatePhoto = async () => {
    if (!newPhoto) {
      setError('Оберіть фото для оновлення')
      return
    }

    setBusyPhoto(true)
    setError('')
    try {
      // Відправляємо PUT запит з FormData (multipart/form-data)
      await updateInventoryPhoto(id, newPhoto)
      await refreshInventory()
      
      // Після оновлення фото завантажуємо дані заново, щоб побачити нову картинку
      const data = await fetchInventoryById(id)
      setItem(data)
      setNewPhoto(null) // Очищуємо поле вибору файлу
    } catch {
      setError('Не вдалося оновити фото')
    } finally {
      setBusyPhoto(false)
    }
  }

  return (
    <main className="page-shell">
      <TopNav />
      <h1 className="section-title">Редагування інвентарю</h1>
      <p className="section-subtitle">Оновлення текстових даних і фото окремо</p>

      {/* Відображення станів завантаження та помилок */}
      {loading && <div className="state-box">Завантаження...</div>}
      {!loading && error && <div className="state-box error">{error}</div>}

      {!loading && item && (
        <>
          {/* Перша форма: тільки для тексту (includePhoto={false}) */}
          <InventoryForm
            submitLabel="Зберегти текстові зміни"
            initialValues={{
              inventory_name: item.inventory_name,
              description: item.description || '',
            }}
            includePhoto={false}
            busy={busyText}
            onSubmit={handleUpdateText}
          />

          {/* Друга форма: окремий блок для оновлення зображення */}
          <div className="state-box" style={{ marginTop: 18 }}>
            <h3 style={{ marginBottom: 12 }}>Оновлення фотографії</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setNewPhoto(event.target.files?.[0] || null)}
              disabled={busyPhoto}
            />
            <div style={{ marginTop: 12 }}>
              <button 
                className="btn btn-primary" 
                onClick={handleUpdatePhoto} 
                disabled={busyPhoto}
              >
                {busyPhoto ? 'Оновлення...' : 'Оновити фото'}
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  )
}