import { useFavoritesContext } from '../store/FavoritesContext.jsx'

export function useFavorites() {
  return useFavoritesContext()
}
