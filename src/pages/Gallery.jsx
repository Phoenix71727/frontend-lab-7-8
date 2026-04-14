import { useMemo, useState } from 'react'
import { TopNav } from '../components/TopNav.jsx'
import { FavoritesBar } from '../components/gallery/FavoritesBar.jsx'
import { InventoryGallery } from '../components/gallery/InventoryGallery.jsx'
import { InventoryQuickView } from '../components/gallery/InventoryQuickView.jsx'
import { useInventory } from '../store/InventoryContext.jsx'
import { useFavorites } from '../hooks/useFavorites.js'
import styles from '../styles/Gallery.module.css'

function GallerySkeleton() {
  return (
    <section className={styles.grid}>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className={styles.skeletonCard} />
      ))}
    </section>
  )
}

export function Gallery() {
  const { items, loading, error, refreshInventory } = useInventory()
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites()
  const [selectedItem, setSelectedItem] = useState(null)

  const favoritesCount = useMemo(() => favoriteIds.length, [favoriteIds])

  return (
    <main className="page-shell">
      <TopNav />
      <h1 className="section-title">Галерея інвентарю складу</h1>
      <p className="section-subtitle">Натискайте на картки для Quick View і додавайте в улюблені</p>

      <FavoritesBar count={favoritesCount} />

      {loading && <GallerySkeleton />}
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
      {!loading && !error && items.length === 0 && (
        <div className="state-box">Інвентар ще не додано. Поверніться пізніше.</div>
      )}
      {!loading && !error && items.length > 0 && (
        <InventoryGallery
          items={items}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          onOpen={setSelectedItem}
        />
      )}

      <InventoryQuickView item={selectedItem} onClose={() => setSelectedItem(null)} />
    </main>
  )
}
