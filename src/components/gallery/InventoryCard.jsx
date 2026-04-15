// Імпортуємо функцію для формування правильного посилання на фото з бекенду
import { getPhotoUrl } from '../../services/inventoryApi.js'
// Імпортуємо стилі для картки (CSS Modules)
import styles from '../../styles/Gallery.module.css'

/* Компонент InventoryCard приймає:
  - item: об'єкт товару (id, назва, фото)
  - isFavorite: булеве значення (чи в обраному)
  - onToggleFavorite: функція для зміни статусу "улюбленого"
  - onOpen: функція для відкриття модального вікна (Quick View)
*/
export function InventoryCard({ item, isFavorite, onToggleFavorite, onOpen }) {
  return (
    // Тег article використовується для семантичної розмітки окремого елемента контенту
    <article className={styles.card}>
      
      {/* Кнопка-"сердечко" для додавання/видалення з обраного */}
      <button 
        className={styles.favorite} 
        onClick={() => onToggleFavorite(item.id)} 
        type="button"
      >
        {/* Якщо isFavorite true — малюємо червоне серце, якщо false — біле */}
        {isFavorite ? '❤️' : '🤍'}
      </button>

      {/* Кнопка-обгортка навколо зображення для виклику Quick View */}
      <button className={styles.imageButton} type="button" onClick={() => onOpen(item)}>
        <img 
          src={getPhotoUrl(item)} // Формуємо шлях до картинки
          alt={item.inventory_name} 
          className={styles.image} 
          loading="lazy" // "Ліниве" завантаження для покращення швидкості сторінки
        />
      </button>

      {/* Блок з текстовою інформацією про товар */}
      <div className={styles.meta}>
        <h3>{item.inventory_name}</h3>
      </div>
    </article>
  )
}