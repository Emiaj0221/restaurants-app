import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/new-restaurant" element={<h1>Nuevo Restaurante</h1>} />
          <Route
            path="/search-restaurant"
            element={<h1>Buscar Restaurante</h1>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
