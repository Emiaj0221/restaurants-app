import { useParams, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import '../styles/RestaurantDetail.css';
import placeholderImage from '../resources/images/placeholderImage.jpg';

const RestaurantDetail = ({ restaurants, favorites, onToggleFavorite }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    return (
      <div className="not-found">
        <h2>Restaurante no encontrado</h2>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          Volver al inicio
        </button>
      </div>
    );
  }

  const isFavorite = favorites.includes(restaurant.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    onToggleFavorite(restaurant.id);
  };

  return (
    <div className="restaurant-detail-container">
      <div className="restaurant-detail-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Volver
        </button>
        <h1 className="restaurant-detail-name">{restaurant.name}</h1>
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <div className="restaurant-detail-content">
        <div className="restaurant-detail-image">
          <img
            src={restaurant.imageUrl || placeholderImage}
            alt={restaurant.name}
            onError={(e) => {
              e.target.src = placeholderImage;
            }}
          />
        </div>

        <div className="restaurant-info">
          <div className="restaurant-meta">
            <span className="restaurant-category">{restaurant.category}</span>
            <span className="restaurant-price">{restaurant.priceRange}</span>
            <div className="restaurant-rating">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < Math.floor(restaurant.rating) ? 'star-filled' : 'star-empty'}
                />
              ))}
              <span>{restaurant.rating}</span>
            </div>
          </div>

          <p className="restaurant-description">{restaurant.description}</p>

          <div className="restaurant-details">
            <div className="detail-item">
              <strong>Dirección:</strong> {restaurant.address}
            </div>
            {restaurant.phone && (
              <div className="detail-item">
                <strong>Teléfono:</strong> {restaurant.phone}
              </div>
            )}
            {restaurant.website && (
              <div className="detail-item">
                <strong>Sitio Web:</strong>{' '}
                <a href={restaurant.website} target="_blank" rel="noopener noreferrer">
                  {restaurant.website}
                </a>
              </div>
            )}
            {restaurant.openingHours && (
              <div className="detail-item">
                <strong>Horario:</strong> {restaurant.openingHours}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
