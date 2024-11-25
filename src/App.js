import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; // Pantalla de login
import Principal from "./pages/Principal"; // Pantalla principal
import Resultados from "./pages/ResultadoBusqueda"; // Pantalla de resultados
import Prestamos from "./pages/Prestamos"; // Pantalla de préstamos
import GestionarLibros from "./pages/GestionarLibros"; // Pantalla de gestión de libros
import PrivateRoute from "./components/PrivateRoute"; // Componente de ruta privada

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Login />} />
        
        {/* Rutas privadas */}
        <Route
          path="/principal"
          element={
            <PrivateRoute>
              <Principal />
            </PrivateRoute>
          }
        />
        <Route
          path="/resultados"
          element={
            <PrivateRoute>
              <Resultados />
            </PrivateRoute>
          }
        />
        <Route
          path="/prestamos"
          element={
            <PrivateRoute>
              <Prestamos />
            </PrivateRoute>
          }
        />
        <Route
          path="/gestionar-libros"
          element={
            <PrivateRoute>
              <GestionarLibros />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
