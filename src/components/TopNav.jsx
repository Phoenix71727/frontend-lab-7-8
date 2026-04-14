import { NavLink } from 'react-router-dom'

function navClassName({ isActive }) {
  return `nav-link${isActive ? ' active-nav' : ''}`
}

export function TopNav() {
  return (
    <nav className="top-nav">
      <NavLink to="/" className={navClassName}>
        Галерея
      </NavLink>
      <NavLink to="/favorites" className={navClassName}>
        Улюблені
      </NavLink>
      <NavLink to="/admin/inventory" className={navClassName}>
        Адмін-панель
      </NavLink>
    </nav>
  )
}
