// Імпортуємо стандартні хуки React для керування станом та оптимізації
import { useMemo, useState } from 'react'
// Компоненти навігації та елементів інтерфейсу
import { TopNav } from '../components/TopNav.jsx'
import { FavoritesBar } from '../components/gallery/FavoritesBar.jsx'
import { InventoryGallery } from '../components/gallery/InventoryGallery.jsx'
import { InventoryQuickView } from '../components/gallery/InventoryQuickView.jsx'
// Глобальні дані про товари та логіка "Улюблених"
import { useInventory } from '../store/InventoryContext.jsx'
import { useFavorites } from '../hooks/useFavorites.js'
// Стилі для галереї
import styles from '../styles/Gallery.module.css'

/**
 * Допоміжний компонент GallerySkeleton.
 * Створює візуальний ефект завантаження (8 порожніх карток з анімацією),
 * поки дані завантажуються з сервера.
 */
function GallerySkeleton() {
  return (
    <section className={styles.grid}>
      {/* Створюємо масив з 8 елементів та рендеримо для кожного div зі стилем скелетона */}
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className={styles.skeletonCard} />
      ))}
    </section>
  )
}

export function Gallery() {
  // Витягуємо дані з контексту інвентарю
  const { items, loading, error, refreshInventory } = useInventory()
  // Дістаємо функції та дані для роботи з улюбленими товарами
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites()
  // Стан для "Quick View" (зберігає об'єкт вибраного товару або null)
  const [selectedItem, setSelectedItem] = useState(null)

  /* useMemo оптимізує підрахунок кількості обраних товарів.
     Значення favoritesCount буде перераховано лише тоді, коли зміниться масив favoriteIds.
  */
  const favoritesCount = useMemo(() => favoriteIds.length, [favoriteIds])

  return (
    <main className="page-shell">
      {/* Навігаційна панель зверху */}
      <TopNav />
      
      <h1 className="section-title">Галерея інвентарю складу</h1>
      <p className="section-subtitle">Натискайте на картки для Quick View і додавайте в улюблені</p>

      {/* Панель, що показує кількість лайкнутих товарів та посилання на них */}
      <FavoritesBar count={favoritesCount} />

      {/* УМОВНИЙ РЕНДЕРИНГ СТАНІВ: */}

      {/* 1. Якщо дані завантажуються — показуємо скелетони */}
      {loading && <GallerySkeleton />}
      
      {/* 2. Якщо сталася помилка — показуємо текст помилки та кнопку перезавантаження */}
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
      
      {/* 3. Якщо запит успішний, але товарів у базі немає */}
      {!loading && !error && items.length === 0 && (
        <div className="state-box">Інвентар ще не додано. Поверніться пізніше.</div>
      )}
      
      {/* 4. Якщо дані є — відображаємо саму галерею */}
      {!loading && !error && items.length > 0 && (
        <InventoryGallery
          items={items}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          onOpen={setSelectedItem} // Передаємо функцію для відкриття модального вікна
        />
      )}

      {/* Модальне вікно для швидкого перегляду. 
          item={selectedItem} вказує, який саме предмет показати.
      */}
      <InventoryQuickView 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} // При закритті зануляємо стан
      />
    </main>
  )
}