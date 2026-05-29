import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Tela de login */}
        <Route path="/" element={<Login />} />

        {/* Página inicial da plataforma */}
        <Route path="/home" element={<Home />} />

        {/* Página de detalhes do filme */}
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;