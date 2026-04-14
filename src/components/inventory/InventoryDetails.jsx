import { getPhotoUrl } from '../../services/inventoryApi.js'
import styles from '../../styles/Details.module.css'

export function InventoryDetails({ item }) {
  return (
    <article className={styles.card}>
      <img src={getPhotoUrl(item)} alt={item.inventory_name} className={styles.photo} />
      <div>
        <h2>{item.inventory_name}</h2>
        <p className={styles.description}>{item.description || 'Опис відсутній'}</p>
      </div>
    </article>
  )
}
