import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TopNav } from '../components/TopNav.jsx'
import { InventoryDetails } from '../components/inventory/InventoryDetails.jsx'
import { fetchInventoryById } from '../services/inventoryApi.js'

export function AdminInventoryDetails() {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await fetchInventoryById(id)
        setItem(data)
      } catch {
        setError('Позицію не знайдено або сервер недоступний')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [id])

  return (
    <main className="page-shell">
      <TopNav />
      <h1 className="section-title">Деталі інвентарю</h1>
      <p className="section-subtitle">Перегляд повної інформації</p>

      {loading && <div className="state-box">Завантаження...</div>}
      {!loading && error && <div className="state-box error">{error}</div>}
      {!loading && item && <InventoryDetails item={item} />}

      <div style={{ marginTop: 14 }}>
        <Link className="btn btn-secondary" to="/admin/inventory">
          Назад до списку
        </Link>
      </div>
    </main>
  )
}
