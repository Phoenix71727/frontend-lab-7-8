import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TopNav } from '../components/TopNav.jsx'
import { InventoryTable } from '../components/inventory/InventoryTable.jsx'
import { ConfirmModal } from '../components/inventory/ConfirmModal.jsx'
import { useInventory } from '../store/InventoryContext.jsx'
import { deleteInventoryItem } from '../services/inventoryApi.js'

export function AdminInventory() {
  const { items, loading, error, refreshInventory } = useInventory()
  const [selectedItem, setSelectedItem] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!selectedItem) {
      return
    }

    setDeleting(true)
    try {
      await deleteInventoryItem(selectedItem.id)
      setSelectedItem(null)
      await refreshInventory()
    } catch {
      alert('Не вдалося видалити інвентар')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <main className="page-shell">
      <TopNav />
      <h1 className="section-title">Адмін-панель інвентарю</h1>
      <p className="section-subtitle">Повне керування позиціями складу</p>

      <div style={{ marginBottom: 14 }}>
        <Link className="btn btn-primary" to="/admin/inventory/create">
          + Додати нову позицію
        </Link>
      </div>

      {loading && <div className="state-box">Завантаження списку інвентарю...</div>}
      {!loading && error && (
        <div className="state-box error">
          {error}
          <div style={{ marginTop: 10 }}>
            <button className="btn btn-secondary" onClick={refreshInventory}>
              Спробувати знову
            </button>
          </div>
        </div>
      )}
      {!loading && !error && items.length === 0 && (
        <div className="state-box">На складі ще немає жодної позиції.</div>
      )}
      {!loading && !error && items.length > 0 && (
        <InventoryTable items={items} onDelete={setSelectedItem} />
      )}

      {selectedItem && (
        <ConfirmModal
          title="Підтвердити видалення"
          description={`Ви дійсно хочете видалити "${selectedItem.inventory_name}"?`}
          onCancel={() => setSelectedItem(null)}
          onConfirm={handleDelete}
          busy={deleting}
        />
      )}
    </main>
  )
}
