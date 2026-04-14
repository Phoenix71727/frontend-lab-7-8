import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopNav } from '../components/TopNav.jsx'
import { InventoryForm } from '../components/inventory/InventoryForm.jsx'
import { createInventoryItem } from '../services/inventoryApi.js'
import { useInventory } from '../store/InventoryContext.jsx'

export function AdminInventoryCreate() {
  const navigate = useNavigate()
  const { refreshInventory } = useInventory()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const handleCreate = async (payload) => {
    setBusy(true)
    setError('')

    try {
      await createInventoryItem(payload)
      try {
        await refreshInventory()
      } catch {
        // The item is already created; list can be refreshed on destination page.
      }
      navigate('/admin/inventory')
    } catch (err) {
      setError(err?.response?.data?.error || 'Не вдалося створити запис')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="page-shell">
      <TopNav />
      <h1 className="section-title">Додавання інвентарю</h1>
      <p className="section-subtitle">Створення нової позиції складу</p>
      {error && <div className="state-box error">{error}</div>}
      <InventoryForm submitLabel="Створити" busy={busy} onSubmit={handleCreate} />
    </main>
  )
}
