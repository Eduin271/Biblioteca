import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; // Pantalla de login
import Principal from "./pages/Principal"; // Pantalla principal
import Devoluciones from "./pages/Devoluciones"; // Pantalla de resultados
import Prestamos from "./pages/Prestamos"; // Pantalla de préstamos
import GestionLibros from "./pages/GestionLibros"; // Pantalla de gestión de libros
import GestionCliente from "./pages/GestionCliente"; // Pantalla de gestión de Clientes
import PrivateRoute from "./components/PrivateRoute"; // Componente de ruta privada
import AgregarLibro from "./components/AgregarLibro";//Pantalla para agregar libros.
import EditarLibro from "./components/EditarLibro";//Pantalla para Editar libros.
import AgregarPrestamo from "./components/AgregarPrestamo";//Pantalla para agregar prestamo.
import AgregarDevolucion from "./components/AgregarDevolucion";//Pantalla para agregar devolucion.



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
          path="/devoluciones"
          element={
            <PrivateRoute>
              <Devoluciones />
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
              <GestionLibros />
            </PrivateRoute>
          }
        />
         <Route
          path="/gestionar-cliente"
          element={
            <PrivateRoute>
              <GestionCliente />
            </PrivateRoute>
          }
        />
        <Route
          path="/agregar-libro"
          element={
            <PrivateRoute>
              <AgregarLibro />
            </PrivateRoute>
          }
        />
       <Route
        path="/editar-libro/:idLibro"
        element={
          <PrivateRoute>
            <EditarLibro />
          </PrivateRoute>
        }
      />
      <Route
        path="/agregar-prestamo"
        element={
          <PrivateRoute>
            <AgregarPrestamo />
          </PrivateRoute>
        }
      />
      <Route
        path="/agregar-devolucion"
        element={
          <PrivateRoute>
            <AgregarDevolucion />
          </PrivateRoute>
        }
      />

      </Routes>
    </Router>
  );
};

export default App;
