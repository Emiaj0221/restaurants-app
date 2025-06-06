import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/RestaurantCard.css';
import placeholderImage from '../resources/images/placeholderImage.jpg';

const RestaurantCard = ({ restaurant, isFavorite, onToggleFavorite }) => {
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(restaurant.id);
  };

  return (
    <div className="restaurant-card">
      <div className="card-inner">
        {/* Cara frontal */}
        <div className="card-front">
          <div className="restaurant-image">
            <img
              src={restaurant.imageUrl || placeholderImage}
              alt={restaurant.name}
              onError={(e) => {
                e.target.src = placeholderImage;
              }}
            />
            <button
              className={`favorite-btn ${isFavorite ? 'active' : ''}`}
              onClick={handleFavoriteClick}
              aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            >
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
          <div className="restaurant-info">
            <div className="restaurant-header">
              <h3 className="restaurant-name">{restaurant.name}</h3>
              <span className="restaurant-price">{restaurant.priceRange}</span>
            </div>
            <div className="restaurant-meta">
              <span className="restaurant-category">{restaurant.category}</span>
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
          </div>
        </div>
        {/* Cara trasera */}
        <div className="card-back">
          <div className="restaurant-info-back">
            <h3 className="restaurant-name">{restaurant.name}</h3>
            <p className="restaurant-description">
              {restaurant.description.length > 150
                ? `${restaurant.description.substring(0, 150)}...`
                : restaurant.description}
            </p>
            <div className="restaurant-location">
              <span>{restaurant.address}</span>
            </div>
            <Link to={`/restaurant/${restaurant.id}`} className="view-details-btn">
              Ver detalles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;