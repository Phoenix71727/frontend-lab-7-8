// Імпортуємо базовий хук з Контексту улюблених товарів
import { useFavoritesContext } from '../store/FavoritesContext.jsx'

/**
 * Кастомний хук-обгортка useFavorites.
 * Він створений для того, щоб у компонентах ми імпортували один цей хук,
 * замість того, щоб щоразу писати useContext(FavoritesContext).
 */
export function useFavorites() {
  // Просто повертаємо результат виконання контекстного хука.
  // Тепер будь-який компонент може написати: const { favoriteIds, toggleFavorite } = useFavorites()
  return useFavoritesContext()
}