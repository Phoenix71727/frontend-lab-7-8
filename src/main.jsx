/* Головний файл застосунку (Entry Point).
  Тут ми "монтуємо" (вставляємо) React-додаток у реальний HTML-документ (index.html).
*/

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Імпорт глобальних стилів, які застосовуються до всього сайту
import './index.css'
// Головний компонент-контейнер, де лежить маршрутизація
import App from './App.jsx'

// Імпортуємо Провайдери Контексту
import { InventoryProvider } from './store/InventoryContext.jsx'
import { FavoritesProvider } from './store/FavoritesContext.jsx'

/* Знаходимо в index.html елемент з id="root" і створюємо в ньому "корінь" React.
  Метод .render() малює наш код всередині цього елемента.
*/
createRoot(document.getElementById('root')).render(
  /* StrictMode — допоміжний компонент React, який під час розробки 
    підсвічує потенційні проблеми в коді (наприклад, застарілі методи).
  */
  <StrictMode>
    {/* InventoryProvider: огортає весь додаток, щоб будь-яка сторінка 
      могла отримати список товарів з бази даних через useInventory().
    */}
    <InventoryProvider>
      {/* FavoritesProvider: знаходиться всередині InventoryProvider. 
        Надає доступ до функцій роботи з обраними товарами (localStorage).
      */}
      <FavoritesProvider>
        {/* Сам додаток з усіма його сторінками */}
        <App />
      </FavoritesProvider>
    </InventoryProvider>
  </StrictMode>,
)