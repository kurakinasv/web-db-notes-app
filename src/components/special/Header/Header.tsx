import { NavLink } from 'react-router-dom';

import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <h1>Ваши заметки</h1>
      <nav className="app-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? 'app-link app-link-active' : 'app-link')}
        >
          Мои заметки
        </NavLink>
        <NavLink
          to="/api-notes"
          className={({ isActive }) => (isActive ? 'app-link app-link-active' : 'app-link')}
        >
          Покемон
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
