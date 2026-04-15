// Імпортуємо компонент Link для навігації без перезавантаження сторінки
import { Link } from 'react-router-dom'
// Імпортуємо об'єкт зі стилями (CSS Modules), щоб уникнути конфліктів імен класів
import styles from '../../styles/Gallery.module.css'

// Компонент FavoritesBar приймає пропс count (кількість обраних товарів)
export function FavoritesBar({ count }) {
  return (
    // Використовуємо клас favoritesBar із CSS-модуля для контейнера панелі
    <div className={styles.favoritesBar}>
      {/* Виводимо динамічну кількість улюблених позицій */}
      <span>Улюблені позиції: {count}</span>
      
      {/* Використовуємо Link замість <a>, щоб React Router просто підмінив компонент 
          на сторінці без запиту до сервера (забезпечуємо SPA поведінку)
      */}
      <Link to="/favorites" className="btn btn-secondary">
        Переглянути
      </Link>
    </div>
  )
}