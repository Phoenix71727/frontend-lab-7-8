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
        <Route path="/" element={<Gallery />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/admin/inventory" element={<AdminInventory />} />
        <Route path="/admin/inventory/create" element={<AdminInventoryCreate />} />
        <Route path="/admin/inventory/:id" element={<AdminInventoryDetails />} />
        <Route path="/admin/inventory/:id/edit" element={<AdminInventoryEdit />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
