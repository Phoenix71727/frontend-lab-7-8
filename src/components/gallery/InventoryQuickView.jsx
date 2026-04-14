import { getPhotoUrl } from '../../services/inventoryApi.js'
import styles from '../../styles/Modal.module.css'

export function InventoryQuickView({ item, onClose }) {
  if (!item) {
    return null
  }

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true">
      <div className={styles.modalLarge}>
        <button className={styles.close} onClick={onClose} type="button" aria-label="Закрити">
          x
        </button>
        <img src={getPhotoUrl(item)} alt={item.inventory_name} className={styles.quickImage} />
        <h3>{item.inventory_name}</h3>
        <p>{item.description || 'Опис відсутній'}</p>
      </div>
    </div>
  )
}
