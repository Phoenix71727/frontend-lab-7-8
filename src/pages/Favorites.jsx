import { useEffect, useMemo, useState } from 'react'
import { TopNav } from '../components/TopNav.jsx'
import { InventoryGallery } from '../components/gallery/InventoryGallery.jsx'
import { InventoryQuickView } from '../components/gallery/InventoryQuickView.jsx'
import { useInventory } from '../store/InventoryContext.jsx'
import { useFavorites } from '../hooks/useFavorites.js'

export function Favorites() {
  const { items, loading, error } = useInventory()
  const { favoriteIds, isFavorite, toggleFavorite, removeFavorite } = useFavorites()
  const [selectedItem, setSelectedItem] = useState(null)

  const existingIds = useMemo(() => new Set(items.map((item) => item.id)), [items])

  useEffect(() => {
    favoriteIds.forEach((id) => {
      if (!existingIds.has(id)) {
        removeFavorite(id)
      }
    })
  }, [favoriteIds, existingIds, removeFavorite])

  const favoriteItems = useMemo(
    () => items.filter((item) => favoriteIds.includes(item.id)),
    [items, favoriteIds],
  )

  return (
    <main className="page-shell">
      <TopNav />
      <h1 className="section-title">Улюблені позиції</h1>
      <p className="section-subtitle">Збережені у localStorage товари</p>

      {loading && <div className="state-box">Завантаження...</div>}
      {!loading && error && <div className="state-box error">{error}</div>}
      {!loading && !error && favoriteItems.length === 0 && (
        <div className="state-box">У вас поки немає улюблених позицій.</div>
      )}

      {!loading && !error && favoriteItems.length > 0 && (
        <InventoryGallery
          items={favoriteItems}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          onOpen={setSelectedItem}
        />
      )}

      <InventoryQuickView item={selectedItem} onClose={() => setSelectedItem(null)} />
    </main>
  )
}
