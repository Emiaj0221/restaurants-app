import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import "./style/footer.css";
import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";
import NewRestaurant from "./pages/NewRestaurant";
import { getRestaurants } from "./services/firebaseRestaurantService";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getRestaurants();
        setRestaurants(data);

        const savedFavorites = localStorage.getItem("favorites");
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (restaurantId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(restaurantId)) {
        return prevFavorites.filter((id) => id !== restaurantId);
      } else {
        return [...prevFavorites, restaurantId];
      }
    });
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <main className="container mx-auto p-4">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  restaurants={restaurants}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
              }
            />
            <Route
              path="/new"
              element={<NewRestaurant setRestaurants={setRestaurants} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
