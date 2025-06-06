import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NewRestaurant from './pages/NewRestaurant';
import RestaurantDetail from './pages/RestaurantDetail';
import './App.css';

function App() {
  const [favorites, setFavorites] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error al cargar favoritos:', error);
        setFavorites([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (restaurantId) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.includes(restaurantId);
      if (isFavorite) {
        return prevFavorites.filter((id) => id !== restaurantId);
      } else {
        return [...prevFavorites, restaurantId];
      }
    });
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                  restaurants={restaurants}
                  setRestaurants={setRestaurants}
                />
              }
            />
            <Route path="/new" element={<NewRestaurant />} />
            <Route
              path="/restaurant/:id"
              element={
                <RestaurantDetail
                  restaurants={restaurants}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;