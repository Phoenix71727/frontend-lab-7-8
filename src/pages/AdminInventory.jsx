// Імпортуємо стандартний хук для керування станом вибраного елемента та процесу видалення
import { useState } from 'react'
// Link дозволяє переходити на сторінку створення без перезавантаження браузера
import { Link } from 'react-router-dom'

// Імпортуємо компоненти інтерфейсу
import { TopNav } from '../components/TopNav.jsx'
import { InventoryTable } from '../components/inventory/InventoryTable.jsx'
import { ConfirmModal } from '../components/inventory/ConfirmModal.jsx'

// Імпортуємо кастомні хуки для роботи з глобальним станом (інвентар та обране)
import { useInventory } from '../store/InventoryContext.jsx'
import { useFavorites } from '../hooks/useFavorites.js'

// Імпортуємо функцію для запиту на видалення з API сервісу
import { deleteInventoryItem } from '../services/inventoryApi.js'

export function AdminInventory() {
  // Отримуємо дані та методи з глобального контексту інвентарю
  const { items, loading, error, refreshInventory } = useInventory()
  // Отримуємо метод для видалення з обраного (якщо ми видаляємо предмет з бази, він має зникнути і з зірочок)
  const { removeFavorite } = useFavorites()

  // Стан для зберігання об'єкта, який ми хочемо видалити (активує модальне вікно)
  const [selectedItem, setSelectedItem] = useState(null)
  // Стан для відображення процесу деактивації кнопок під час запиту до сервера
  const [deleting, setDeleting] = useState(false)

  // Функція, яка виконує видалення після підтвердження в модалці
  const handleDelete = async () => {
    if (!selectedItem) return

    setDeleting(true) // Починаємо процес (блокуємо інтерфейс)
    try {
      // 1. Надсилаємо DELETE запит на сервер за ID
      await deleteInventoryItem(selectedItem.id)
      
      // 2. Видаляємо цей ID з локального списку "Улюблених" у localStorage
      removeFavorite(selectedItem.id)
      
      // 3. Закриваємо модальне вікно
      setSelectedItem(null)
      
      // 4. Оновлюємо глобальний масив інвентарю, щоб видалений предмет зник з таблиці
      await refreshInventory()
    } catch {
      // Якщо сервер повернув помилку
      alert('Не вдалося видалити інвентар')
    } finally {
      setDeleting(false) // Завершуємо процес (розблоковуємо інтерфейс)
    }
  }

  return (
    <main className="page-shell">
      {/* Верхня навігація */}
      <TopNav />
      
      <h1 className="section-title">Адмін-панель інвентарю</h1>
      <p className="section-subtitle">Повне керування позиціями складу</p>

      {/* Кнопка переходу до форми створення */}
      <div style={{ marginBottom: 14 }}>
        <Link className="btn btn-primary" to="/admin/inventory/create">
          + Додати нову позицію
        </Link>
      </div>

      {/* 1. Стан завантаження */}
      {loading && <div className="state-box">Завантаження списку інвентарю...</div>}
      
      {/* 2. Обробка помилки при отриманні даних */}
      {!loading && error && (
        <div className="state-box error">
          {error}
          <div style={{ marginTop: 10 }}>
            <button className="btn btn-secondary" onClick={refreshInventory}>
              Спробувати знову
            </button>
          </div>
        </div>
      )}
      
      {/* 3. Стан порожнього списку (успішно, але даних нема) */}
      {!loading && !error && items.length === 0 && (
        <div className="state-box">На складі ще немає жодної позиції.</div>
      )}
      
      {/* 4. Відображення таблиці з даними */}
      {!loading && !error && items.length > 0 && (
        /* Передаємо функцію setSelectedItem як onDelete. 
           Коли в таблиці натиснуть "Видалити", об'єкт запишеться в стан і відкриється модалка.
        */
        <InventoryTable items={items} onDelete={setSelectedItem} />
      )}

      {/* Умовний рендеринг модального вікна підтвердження.
          Воно з'являється лише тоді, коли в selectedItem лежить об'єкт товару.
      */}
      {selectedItem && (
        <ConfirmModal
          title="Підтвердити видалення"
          description={`Ви дійсно хочете видалити "${selectedItem.inventory_name}"?`}
          onCancel={() => setSelectedItem(null)} // Закрити вікно без видалення
          onConfirm={handleDelete} // Викликати функцію видалення
          busy={deleting} // Передаємо стан завантаження в модалку
        />
      )}
    </main>
  )
}