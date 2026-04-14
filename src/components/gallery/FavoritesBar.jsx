import { Link } from 'react-router-dom'
import styles from '../../styles/Gallery.module.css'

export function FavoritesBar({ count }) {
  return (
    <div className={styles.favoritesBar}>
      <span>Улюблені позиції: {count}</span>
      <Link to="/favorites" className="btn btn-secondary">
        Переглянути
      </Link>
    </div>
  )
}
