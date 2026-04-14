import { getPhotoUrl } from '../../services/inventoryApi.js'
import styles from '../../styles/Gallery.module.css'

export function InventoryCard({ item, isFavorite, onToggleFavorite, onOpen }) {
  return (
    <article className={styles.card}>
      <button className={styles.favorite} onClick={() => onToggleFavorite(item.id)} type="button">
        {isFavorite ? '❤️' : '🤍'}
      </button>
      <button className={styles.imageButton} type="button" onClick={() => onOpen(item)}>
        <img src={getPhotoUrl(item)} alt={item.inventory_name} className={styles.image} loading="lazy" />
      </button>
      <div className={styles.meta}>
        <h3>{item.inventory_name}</h3>
      </div>
    </article>
  )
}
