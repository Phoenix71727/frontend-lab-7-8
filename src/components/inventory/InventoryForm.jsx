// Імпортуємо хук useState для керування станом полів введення всередині форми
import { useState } from 'react'
// Імпортуємо стилі для оформлення полів, відступів та міток (labels)
import styles from '../../styles/Form.module.css'

/* Універсальний компонент форми, що приймає:
  - initialValues: початкові дані (потрібні при редагуванні)
  - submitLabel: текст на кнопці (наприклад, "Створити" або "Зберегти")
  - includePhoto: чи показувати поле завантаження файлу (true/false)
  - busy: стан завантаження (блокує кнопку та поля під час запиту)
  - onSubmit: функція-обробник, яка відправляє дані на бекенд
*/
export function InventoryForm({
  initialValues = { inventory_name: '', description: '' },
  submitLabel,
  includePhoto = true,
  busy = false,
  onSubmit,
}) {
  // Локальні стани для кожного поля форми (контрольовані компоненти)
  const [inventoryName, setInventoryName] = useState(initialValues.inventory_name)
  const [description, setDescription] = useState(initialValues.description)
  const [photo, setPhoto] = useState(null) // Тут зберігається об'єкт файлу
  const [error, setError] = useState('') // Стан для виведення повідомлень про помилки валідації

  // Функція обробки натискання кнопки Submit
  const handleSubmit = async (event) => {
    // Відміняємо стандартну поведінку браузера (перезавантаження сторінки)
    event.preventDefault()

    // Базова валідація: перевірка на порожнє ім'я (видаляємо пробіли через trim)
    if (!inventoryName.trim()) {
      setError('Поле "Назва інвентарю" є обовʼязковим')
      return
    }

    // Якщо все добре, очищуємо помилку і передаємо дані у батьківську функцію onSubmit
    setError('')
    await onSubmit({
      inventory_name: inventoryName.trim(),
      description: description.trim(),
      photo,
    })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Поле введення назви */}
      <label className={styles.field}>
        <span>Назва інвентарю *</span>
        <input
          type="text"
          value={inventoryName}
          // Оновлюємо стан при кожному натисканні клавіші
          onChange={(event) => setInventoryName(event.target.value)}
          placeholder="Наприклад: Ноутбук Dell"
          disabled={busy} // Блокуємо поле, якщо йде запит
        />
      </label>

      {/* Поле введення опису (textarea для багаторядкового тексту) */}
      <label className={styles.field}>
        <span>Опис</span>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Короткий опис інвентарю"
          rows={5}
          disabled={busy}
        />
      </label>

      {/* Умовний рендеринг поля для завантаження фото */}
      {includePhoto && (
        <label className={styles.field}>
          <span>Фото</span>
          <input
            type="file"
            accept="image/*" // Дозволяємо вибирати лише зображення
            // Отримуємо перший файл з масиву вибраних файлів
            onChange={(event) => setPhoto(event.target.files?.[0] || null)}
            disabled={busy}
          />
        </label>
      )}

      {/* Виведення повідомлення про помилку, якщо воно є */}
      {error && <p className="error">{error}</p>}

      {/* Кнопка відправки. Змінює текст залежно від стану busy */}
      <button className="btn btn-primary" disabled={busy} type="submit">
        {busy ? 'Збереження...' : submitLabel}
      </button>
    </form>
  )
}