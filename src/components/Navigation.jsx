import { Link, useLocation } from 'react-router-dom';

function Navigation({ favoritesCount }) {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🍽️ Directorio Restaurantes
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            🏠 Inicio
          </Link>
          
          <Link 
            to="/search" 
            className={`nav-link ${isActive('/search') ? 'active' : ''}`}
          >
            🔍 Buscar
          </Link>
          
          <Link 
            to="/new" 
            className={`nav-link ${isActive('/new') ? 'active' : ''}`}
          >
            ➕ Nuevo Restaurante
          </Link>
          
          <div className="favorites-counter">
            ❤️ {favoritesCount}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;