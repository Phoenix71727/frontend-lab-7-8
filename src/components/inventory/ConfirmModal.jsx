// Імпортуємо стилі модального вікна (центрикування, фоновий затінювач, кнопки)
import styles from '../../styles/Modal.module.css'

/* Компонент ConfirmModal приймає:
  - title: заголовок (наприклад, "Підтвердіть видалення")
  - description: пояснювальний текст
  - onCancel: функція, що викликається при натисканні "Скасувати"
  - onConfirm: функція, що викликається при натисканні "Підтвердити"
  - busy: булевий прапорець (true, якщо зараз йде запит на сервер)
*/
export function ConfirmModal({ title, description, onCancel, onConfirm, busy = false }) {
  return (
    /* Напівпрозорий фон (backdrop), що перекриває весь інтерфейс.
       role="dialog" вказує браузеру, що це допоміжне вікно.
    */
    <div className={styles.backdrop} role="dialog" aria-modal="true">
      {/* Контейнер самого модального вікна */}
      <div className={styles.modal}>
        {/* Виводимо заголовок та опис, передані через пропси */}
        <h3>{title}</h3>
        <p>{description}</p>

        {/* Блок з кнопками дій */}
        <div className={styles.actions}>
          
          {/* Кнопка скасування. Блокується (disabled), якщо йде процес видалення */}
          <button 
            className="btn btn-secondary" 
            onClick={onCancel} 
            disabled={busy}
          >
            Скасувати
          </button>

          {/* Кнопка підтвердження. 
              Якщо busy === true, текст змінюється на "Видалення...", 
              щоб користувач розумів, що система працює.
          */}
          <button 
            className="btn btn-primary" 
            onClick={onConfirm} 
            disabled={busy}
          >
            {busy ? 'Видалення...' : 'Підтвердити'}
          </button>
        </div>
      </div>
    </div>
  )
}