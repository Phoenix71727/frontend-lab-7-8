import { InventoryCard } from './InventoryCard.jsx'
import styles from '../../styles/Gallery.module.css'

export function InventoryGallery({ items, isFavorite, onToggleFavorite, onOpen }) {
  return (
    <section className={styles.grid}>
      {items.map((item) => (
        <InventoryCard
          key={item.id}
          item={item}
          isFavorite={isFavorite(item.id)}
          onToggleFavorite={onToggleFavorite}
          onOpen={onOpen}
        />
      ))}
    </section>
  )
}
