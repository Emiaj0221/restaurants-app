import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import "./style/footer.css";
import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";
import NewRestaurant from "./pages/NewRestaurant";
import SearchRestaurant from "./pages/SearchRestaurant";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/new-restaurant" element={<NewRestaurant />} />
            <Route
              path="/search-restaurant"
              element={<SearchRestaurant />}
            />
          </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
