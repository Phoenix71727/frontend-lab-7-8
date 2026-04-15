// Основний компонент маршрутизації застосунку
// - Описує видимі маршрути для користувача і для адміністратора
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Gallery } from './pages/Gallery.jsx'
import { Favorites } from './pages/Favorites.jsx'
import { AdminInventory } from './pages/AdminInventory.jsx'
import { AdminInventoryCreate } from './pages/AdminInventoryCreate.jsx'
import { AdminInventoryDetails } from './pages/AdminInventoryDetails.jsx'
import { AdminInventoryEdit } from './pages/AdminInventoryEdit.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Головна сторінка: візуальна галерея */}
        <Route path="/" element={<Gallery />} />
        {/* Сторінка улюблених */}
        <Route path="/favorites" element={<Favorites />} />
        {/* Адмін-панель: список інвентарю */}
        <Route path="/admin/inventory" element={<AdminInventory />} />
        {/* Створення нової позиції */}
        <Route path="/admin/inventory/create" element={<AdminInventoryCreate />} />
        {/* Деталі позиції */}
        <Route path="/admin/inventory/:id" element={<AdminInventoryDetails />} />
        {/* Редагування позиції */}
        <Route path="/admin/inventory/:id/edit" element={<AdminInventoryEdit />} />
        {/* Будь-який інший шлях повертає на головну */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
