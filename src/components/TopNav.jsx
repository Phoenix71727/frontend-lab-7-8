// Імпортуємо NavLink — це спеціальна версія Link, яка "знає", чи є посилання активним у даний момент
import { NavLink } from 'react-router-dom'

/* Функція для динамічного формування імені класу.
   React Router автоматично передає об'єкт зі станом isActive у функцію className.
   Якщо сторінка активна — додаємо клас 'active-nav' для підсвічування в меню.
*/
function navClassName({ isActive }) {
  return `nav-link${isActive ? ' active-nav' : ''}`
}

export function TopNav() {
  return (
    // Тег nav для семантичного позначення блоку навігації
    <nav className="top-nav">
      
      {/* NavLink до головної сторінки (Галерея) */}
      <NavLink to="/" className={navClassName}>
        Галерея
      </NavLink>

      {/* NavLink до сторінки обраних товарів */}
      <NavLink to="/favorites" className={navClassName}>
        Улюблені
      </NavLink>

      {/* NavLink до списку інвентарю в адмін-панелі */}
      <NavLink to="/admin/inventory" className={navClassName}>
        Адмін-панель
      </NavLink>
      
    </nav>
  )
}