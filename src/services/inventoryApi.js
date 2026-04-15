// Імпортуємо бібліотеку axios для здійснення HTTP-запитів
import axios from 'axios'

/* Створюємо екземпляр axios з базовими налаштуваннями.
  baseURL: береться з перемінних оточення Vite. Якщо вона порожня (як у нашому випадку), 
  запити йдуть на той самий домен, де запущено фронтенд, і підхоплюються проксі-сервером у vite.config.js.
*/
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
})

/**
 * Отримати повний список інвентарю.
 * Використовує метод GET. Повертає масив об'єктів.
 */
export const fetchInventory = async () => {
  const { data } = await api.get('/inventory')
  return data
}

/**
 * Отримати дані конкретного предмета за його унікальним ID.
 * Використовує динамічний шлях у URL.
 */
export const fetchInventoryById = async (id) => {
  const { data } = await api.get(`/inventory/${id}`)
  return data
}

/**
 * Реєстрація (створення) нової позиції на складі.
 * Важливо: Використовує FormData, оскільки ми передаємо файл (зображення).
 * Браузер автоматично встановить заголовок Content-Type: multipart/form-data.
 */
export const createInventoryItem = async ({ inventory_name, description, photo }) => {
  const formData = new FormData()
  formData.append('inventory_name', inventory_name) // Додаємо текстове поле
  formData.append('description', description || '') // Додаємо опис (або пусту строку)
  
  if (photo) {
    formData.append('photo', photo) // Додаємо об'єкт файлу, якщо він вибраний
  }

  const { data } = await api.post('/register', formData)
  return data
}

/**
 * Оновлення текстової інформації про предмет.
 * Відправляє дані у форматі JSON (стандартно для axios при передачі об'єкта payload).
 * Метод PUT використовується для повного оновлення ресурсу.
 */
export const updateInventoryItem = async (id, payload) => {
  const { data } = await api.put(`/inventory/${id}`, payload)
  return data
}

/**
 * Окремий метод для оновлення тільки фотографії.
 * Також використовує FormData для коректної передачі бінарних даних файлу.
 */
export const updateInventoryPhoto = async (id, photo) => {
  const formData = new FormData()
  formData.append('photo', photo)
  const { data } = await api.put(`/inventory/${id}/photo`, formData)
  return data
}

/**
 * Видалення предмета з бази даних за його ID.
 * Метод DELETE.
 */
export const deleteInventoryItem = async (id) => {
  const { data } = await api.delete(`/inventory/${id}`)
  return data
}

/**
 * Утиліта для генерації правильного посилання на зображення.
 * 1. Якщо в базі вже лежить повний шлях (http...), повертає його.
 * 2. Якщо шлях відносний, склеює його з адресою бекенду.
 * Це дозволяє коректно відображати картинки в тегах <img>.
 */
export const getPhotoUrl = (item) => {
  if (!item) {
    return ''
  }

  // Перевірка, чи є фото зовнішнім посиланням
  if (item.photo && item.photo.startsWith('http')) {
    return item.photo
  }

  // Формування шляху до ендпоінту бекенду, який віддає картинку
  const path = item.photo || `/inventory/${item.id}/photo`
  const base = import.meta.env.VITE_API_BASE_URL || ''
  return `${base}${path}`
}