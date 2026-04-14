import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TopNav } from '../components/TopNav.jsx'
import { InventoryForm } from '../components/inventory/InventoryForm.jsx'
import {
  fetchInventoryById,
  updateInventoryItem,
  updateInventoryPhoto,
} from '../services/inventoryApi.js'
import { useInventory } from '../store/InventoryContext.jsx'

export function AdminInventoryEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { refreshInventory } = useInventory()

  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [busyText, setBusyText] = useState(false)
  const [busyPhoto, setBusyPhoto] = useState(false)
  const [newPhoto, setNewPhoto] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await fetchInventoryById(id)
        setItem(data)
      } catch {
        setError('Не вдалося завантажити інвентар')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [id])

  const handleUpdateText = async ({ inventory_name, description }) => {
    setBusyText(true)
    setError('')

    try {
      await updateInventoryItem(id, { inventory_name, description })
      await refreshInventory()
      navigate(`/admin/inventory/${id}`)
    } catch {
      setError('Не вдалося оновити текстові дані')
    } finally {
      setBusyText(false)
    }
  }

  const handleUpdatePhoto = async () => {
    if (!newPhoto) {
      setError('Оберіть фото для оновлення')
      return
    }

    setBusyPhoto(true)
    setError('')

    try {
      await updateInventoryPhoto(id, newPhoto)
      await refreshInventory()
      const data = await fetchInventoryById(id)
      setItem(data)
      setNewPhoto(null)
    } catch {
      setError('Не вдалося оновити фото')
    } finally {
      setBusyPhoto(false)
    }
  }

  return (
    <main className="page-shell">
      <TopNav />
      <h1 className="section-title">Редагування інвентарю</h1>
      <p className="section-subtitle">Оновлення текстових даних і фото окремо</p>

      {loading && <div className="state-box">Завантаження...</div>}
      {!loading && error && <div className="state-box error">{error}</div>}

      {!loading && item && (
        <>
          <InventoryForm
            submitLabel="Зберегти текстові зміни"
            initialValues={{
              inventory_name: item.inventory_name,
              description: item.description || '',
            }}
            includePhoto={false}
            busy={busyText}
            onSubmit={handleUpdateText}
          />

          <div className="state-box" style={{ marginTop: 18 }}>
            <h3 style={{ marginBottom: 12 }}>Оновлення фотографії</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setNewPhoto(event.target.files?.[0] || null)}
              disabled={busyPhoto}
            />
            <div style={{ marginTop: 12 }}>
              <button className="btn btn-primary" onClick={handleUpdatePhoto} disabled={busyPhoto}>
                {busyPhoto ? 'Оновлення...' : 'Оновити фото'}
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  )
}
