// Імпортуємо компонент окремої картки, який будемо розмножувати
import { InventoryCard } from './InventoryCard.jsx'
// Імпортуємо стилі для сітки (зокрема тут налаштований CSS Grid)
import styles from '../../styles/Gallery.module.css'

/* Компонент InventoryGallery приймає:
  - items: масив усіх об'єктів інвентарю
  - isFavorite: функція-перевірка (повертає true/false для конкретного id)
  - onToggleFavorite: функція для додавання/видалення з обраного
  - onOpen: функція для відкриття модального вікна швидкого перегляду
*/
export function InventoryGallery({ items, isFavorite, onToggleFavorite, onOpen }) {
  return (
    // Використовуємо тег section для семантичного групування карток
    // styles.grid містить налаштування адаптивної сітки
    <section className={styles.grid}>
      
      {/* Проходимо по масиву items за допомогою методу map 
          і для кожного елемента створюємо компонент InventoryCard
      */}
      {items.map((item) => (
        <InventoryCard
          // key — обов'язковий атрибут для React, щоб він міг ефективно 
          // оновлювати список при змінах (використовуємо унікальний id)
          key={item.id}
          
          // Передаємо дані конкретного товару
          item={item}
          
          // Викликаємо функцію-перевірку, щоб дізнатися, чи зафарбовувати серце
          isFavorite={isFavorite(item.id)}
          
          // Прокидаємо функції керування далі в кожну картку (Prop Drilling)
          onToggleFavorite={onToggleFavorite}
          onOpen={onOpen}
        />
      ))}
    </section>
  )
}