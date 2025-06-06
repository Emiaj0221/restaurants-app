import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import RestaurantCard from '../components/RestaurantCard';
import SearchFilters from '../components/SearchFilters';
import { getRestaurants } from '../services/firebaseRestaurantService';
import '../styles/Home.css';

const Home = ({ favorites, onToggleFavorite, restaurants, setRestaurants }) => {
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    rating: 0,
    onlyFavorites: false
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();


    useEffect(() => {
    const loadRestaurants = async () => {
      try {
        setLoading(true);
        setError(null);
        const restaurantsData = await getRestaurants();
        setRestaurants(restaurantsData);
        setFilteredRestaurants(restaurantsData);
      } catch (err) {
        console.error('Error loading restaurants:', err);
        setError('Error al cargar los restaurantes. Por favor, recarga la página.');
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, []);


  useEffect(() => {
    let results = [...restaurants];

    if (searchTerm) {
      results = results.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.category) {
      results = results.filter(restaurant => 
        restaurant.category === filters.category
      );
    }

    if (filters.priceRange) {
      results = results.filter(restaurant => 
        restaurant.priceRange === filters.priceRange
      );
    }

    if (filters.rating > 0) {
      results = results.filter(restaurant => 
        restaurant.rating >= filters.rating
      );
    }

    if (filters.onlyFavorites) {
      results = results.filter(restaurant => 
        favorites.includes(restaurant.id)
      );
    }

      setFilteredRestaurants(results);
  }, [restaurants, searchTerm, filters, favorites]);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleAddNew = () => {
    navigate('/new');
  };

  const handleRefresh = async () => {
    try {
      setLoading(true);
      setError(null);
      const restaurantsData = await getRestaurants();
      setRestaurants(restaurantsData);
    } catch (err) {
      console.error('Error refreshing restaurants:', err);
      setError('Error al actualizar los restaurantes.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando restaurantes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-container">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={handleRefresh} className="refresh-button">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Directorio de Restaurantes</h1>
        <button 
          className="add-button"
          onClick={handleAddNew}
        >
          Añadir Nuevo Restaurante
        </button>
      </div>
      
      <SearchFilters 
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        filters={filters}
        restaurants={restaurants}
      />
      
      {filteredRestaurants.length === 0 ? (
        <div className="no-results">
          <p>No se encontraron restaurantes con estos criterios</p>
        </div>
      ) : (
        <div className="restaurants-grid">
          {filteredRestaurants.map(restaurant => (
            <RestaurantCard 
              key={restaurant.id}
              restaurant={restaurant}
              isFavorite={favorites.includes(restaurant.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home
