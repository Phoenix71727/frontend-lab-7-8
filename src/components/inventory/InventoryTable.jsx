// Імпортуємо Link для швидкої навігації між сторінками адмінки без перезавантаження
import { Link } from 'react-router-dom'
// Імпортуємо допоміжну функцію для формування коректного шляху до фотографії
import { getPhotoUrl } from '../../services/inventoryApi.js'
// Імпортуємо стилі для таблиці (межі, відступи, оформлення рядків)
import styles from '../../styles/AdminTable.module.css'

/* Компонент InventoryTable приймає:
  - items: масив об'єктів інвентарю з бази даних
  - onDelete: функція, що викликає модальне вікно підтвердження видалення
*/
export function InventoryTable({ items, onDelete }) {
  return (
    // Огортка для таблиці (дозволяє налаштувати внутрішні відступи або прокрутку)
    <div className={styles.wrapper}>
      <table className={styles.table}>
        {/* Заголовок таблиці з назвами колонок */}
        <thead>
          <tr>
            <th>Назва інвентарю</th>
            <th>Опис</th>
            <th>Фото</th>
            <th>Дії</th>
          </tr>
        </thead>
        {/* Тіло таблиці, де генеруються рядки з даними */}
        <tbody>
          {/* Перебираємо масив предметів і створюємо рядок <tr> для кожного */}
          {items.map((item) => (
            <tr key={item.id}>
              {/* Назва предмета */}
              <td>{item.inventory_name}</td>
              
              {/* Опис. Якщо він порожній, виводимо прочерк '-' */}
              <td className={styles.description}>{item.description || '-'}</td>
              
              <td>
                {/* Мініатюра зображення */}
                <img
                  src={getPhotoUrl(item)}
                  alt={item.inventory_name}
                  className={styles.preview}
                  loading="lazy" // Оптимізація: завантажувати фото лише коли воно з'являється в зоні видимості
                />
              </td>
              
              <td>
                {/* Група кнопок для керування конкретним записом */}
                <div className={styles.actions}>
                  {/* Перехід на сторінку детального перегляду по ID */}
                  <Link className="btn btn-secondary" to={`/admin/inventory/${item.id}`}>
                    Переглянути
                  </Link>
                  
                  {/* Перехід на сторінку редагування по ID */}
                  <Link className="btn btn-secondary" to={`/admin/inventory/${item.id}/edit`}>
                    Редагувати
                  </Link>
                  
                  {/* Кнопка видалення. Передає весь об'єкт item у функцію onDelete, 
                      щоб модалка знала, яку назву вивести для підтвердження
                  */}
                  <button className="btn btn-secondary" onClick={() => onDelete(item)}>
                    Видалити
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}