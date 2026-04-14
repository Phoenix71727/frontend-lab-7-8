import { useState } from 'react'
import styles from '../../styles/Form.module.css'

export function InventoryForm({
  initialValues = { inventory_name: '', description: '' },
  submitLabel,
  includePhoto = true,
  busy = false,
  onSubmit,
}) {
  const [inventoryName, setInventoryName] = useState(initialValues.inventory_name)
  const [description, setDescription] = useState(initialValues.description)
  const [photo, setPhoto] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!inventoryName.trim()) {
      setError('Поле "Назва інвентарю" є обовʼязковим')
      return
    }

    setError('')
    await onSubmit({
      inventory_name: inventoryName.trim(),
      description: description.trim(),
      photo,
    })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.field}>
        <span>Назва інвентарю *</span>
        <input
          type="text"
          value={inventoryName}
          onChange={(event) => setInventoryName(event.target.value)}
          placeholder="Наприклад: Ноутбук Dell"
          disabled={busy}
        />
      </label>

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

      {includePhoto && (
        <label className={styles.field}>
          <span>Фото</span>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setPhoto(event.target.files?.[0] || null)}
            disabled={busy}
          />
        </label>
      )}

      {error && <p className="error">{error}</p>}

      <button className="btn btn-primary" disabled={busy} type="submit">
        {busy ? 'Збереження...' : submitLabel}
      </button>
    </form>
  )
}
