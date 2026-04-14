import { Link } from 'react-router-dom'
import { getPhotoUrl } from '../../services/inventoryApi.js'
import styles from '../../styles/AdminTable.module.css'

export function InventoryTable({ items, onDelete }) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Назва інвентарю</th>
            <th>Опис</th>
            <th>Фото</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.inventory_name}</td>
              <td className={styles.description}>{item.description || '-'}</td>
              <td>
                <img
                  src={getPhotoUrl(item)}
                  alt={item.inventory_name}
                  className={styles.preview}
                  loading="lazy"
                />
              </td>
              <td>
                <div className={styles.actions}>
                  <Link className="btn btn-secondary" to={`/admin/inventory/${item.id}`}>
                    Переглянути
                  </Link>
                  <Link className="btn btn-secondary" to={`/admin/inventory/${item.id}/edit`}>
                    Редагувати
                  </Link>
                  <button className="btn btn-secondary" onClick={() => onDelete(item)}>
                    Видалити
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
