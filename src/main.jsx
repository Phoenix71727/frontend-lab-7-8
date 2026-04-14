import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { InventoryProvider } from './store/InventoryContext.jsx'
import { FavoritesProvider } from './store/FavoritesContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InventoryProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </InventoryProvider>
  </StrictMode>,
)
