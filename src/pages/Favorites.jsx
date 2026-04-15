// Імпортуємо стандартні хуки React
import { useEffect, useMemo, useState } from 'react'
// Імпортуємо навігацію та компоненти галереї
import { TopNav } from '../components/TopNav.jsx'
import { InventoryGallery } from '../components/gallery/InventoryGallery.jsx'
import { InventoryQuickView } from '../components/gallery/InventoryQuickView.jsx'
// Імпортуємо глобальні дані інвентарю та логіку улюблених
import { useInventory } from '../store/InventoryContext.jsx'
import { useFavorites } from '../hooks/useFavorites.js'

export function Favorites() {
  // Дістаємо список усіх товарів з контексту
  const { items, loading, error } = useInventory()
  // Дістаємо ID улюблених та функції для керування ними (з localStorage)
  const { favoriteIds, isFavorite, toggleFavorite, removeFavorite } = useFavorites()
  // Стан для обраного предмета (для модального вікна Quick View)
  const [selectedItem, setSelectedItem] = useState(null)

  /* useMemo створює Set з усіх ID, які існують у базі даних.
     Це потрібно для швидкої перевірки (O(1)) наявності товару.
  */
  const existingIds = useMemo(() => new Set(items.map((item) => item.id)), [items])

  /* Цей useEffect виконує функцію "чистильника":
     Якщо в localStorage збережений ID товару, який вже видалили з бази (наприклад, через адмінку),
     ми автоматично видаляємо цей ID і з "Улюблених", щоб дані були актуальними.
  */
  useEffect(() => {
    favoriteIds.forEach((id) => {
      if (!existingIds.has(id)) {
        removeFavorite(id) // Видаляємо "фантомний" ID
      }
    })
  }, [favoriteIds, existingIds, removeFavorite])

  /* Фільтруємо загальний список товарів, залишаючи лише ті, 
     чиї ID є в масиві favoriteIds. useMemo оптимізує це, щоб не 
     перераховувати список при кожному рендері без потреби.
  */
  const favoriteItems = useMemo(
    () => items.filter((item) => favoriteIds.includes(item.id)),
    [items, favoriteIds],
  )

  return (
    <main className="page-shell">
      <TopNav />
      <h1 className="section-title">Улюблені позиції</h1>
      <p className="section-subtitle">Збережені у localStorage товари</p>

      {/* Стани завантаження та помилок */}
      {loading && <div className="state-box">Завантаження...</div>}
      {!loading && error && <div className="state-box error">{error}</div>}
      
      {/* Якщо завантаження завершено і список після фільтрації порожній */}
      {!loading && !error && favoriteItems.length === 0 && (
        <div className="state-box">У вас поки немає улюблених позицій.</div>
      )}

      {/* Відображаємо галерею, але передаємо їй тільки відфільтровані (улюблені) товари */}
      {!loading && !error && favoriteItems.length > 0 && (
        <InventoryGallery
          items={favoriteItems}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          onOpen={setSelectedItem}
        />
      )}

      {/* Компонент швидкого перегляду (відкривається при кліку на картку) */}
      <InventoryQuickView item={selectedItem} onClose={() => setSelectedItem(null)} />
    </main>
  )
}