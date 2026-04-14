import styles from '../../styles/Modal.module.css'

export function ConfirmModal({ title, description, onCancel, onConfirm, busy = false }) {
  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className={styles.actions}>
          <button className="btn btn-secondary" onClick={onCancel} disabled={busy}>
            Скасувати
          </button>
          <button className="btn btn-primary" onClick={onConfirm} disabled={busy}>
            {busy ? 'Видалення...' : 'Підтвердити'}
          </button>
        </div>
      </div>
    </div>
  )
}
