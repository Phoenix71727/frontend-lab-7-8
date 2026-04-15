// Імпортуємо функцію для отримання повного шляху до зображення з сервера
import { getPhotoUrl } from '../../services/inventoryApi.js'
// Імпортуємо стилі модального вікна (бекдроп, анімації, позиціонування)
import styles from '../../styles/Modal.module.css'

/* Компонент InventoryQuickView приймає:
  - item: об'єкт вибраного товару (якщо null — вікно не закрите)
  - onClose: функція для закриття модального вікна
*/
export function InventoryQuickView({ item, onClose }) {
  // Умовний рендеринг: якщо товар не вибраний (item === null), 
  // компонент нічого не малює (повертає null)
  if (!item) {
    return null
  }

  return (
    /* Контейнер-затемнення (backdrop) на весь екран.
       Атрибути role та aria-modal потрібні для доступності (accessibility), 
       щоб скрінрідери розуміли, що це модальне вікно.
    */
    <div className={styles.backdrop} role="dialog" aria-modal="true">
      {/* Контентна частина модального вікна */}
      <div className={styles.modalLarge}>
        
        {/* Кнопка закриття вікна (х) */}
        <button 
          className={styles.close} 
          onClick={onClose} 
          type="button" 
          aria-label="Закрити"
        >
          x
        </button>

        {/* Велике зображення товару */}
        <img 
          src={getPhotoUrl(item)} 
          alt={item.inventory_name} 
          className={styles.quickImage} 
        />

        {/* Назва товару */}
        <h3>{item.inventory_name}</h3>

        {/* Опис товару. Якщо опису немає в базі, виводимо текст за замовчуванням */}
        <p>{item.description || 'Опис відсутній'}</p>
      </div>
    </div>
  )
}