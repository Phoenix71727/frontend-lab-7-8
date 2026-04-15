// Імпортуємо функцію для отримання повного URL зображення (склеює базу сервера та шлях до фото)
import { getPhotoUrl } from '../../services/inventoryApi.js'
// Імпортуємо об'єкт зі стилями (CSS Modules) для сторінки деталей
import styles from '../../styles/Details.module.css'

/* Компонент InventoryDetails приймає:
  - item: об'єкт з даними конкретного предмета (назва, опис, посилання на фото)
*/
export function InventoryDetails({ item }) {
  return (
    // Використовуємо семантичний тег article для представлення основної картки контенту
    <article className={styles.card}>
      
      {/* Відображаємо фото предмета. getPhotoUrl(item) гарантує, що шлях буде правильним */}
      <img 
        src={getPhotoUrl(item)} 
        alt={item.inventory_name} 
        className={styles.photo} 
      />
      
      {/* Контейнер для текстової інформації */}
      <div>
        {/* Виводимо назву предмета */}
        <h2>{item.inventory_name}</h2>
        
        {/* Виводимо опис. Якщо опис у базі порожній, використовуємо оператор || для виводу тексту за замовчуванням */}
        <p className={styles.description}>
          {item.description || 'Опис відсутній'}
        </p>
      </div>
    </article>
  )
}