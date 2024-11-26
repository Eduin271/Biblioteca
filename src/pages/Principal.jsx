import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/principal.css"; // Importando los estilos desde Principal.css


const Principal = () => {
  const [busqueda, setBusqueda] = useState("");
  const [libros, setLibros] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerLibros = async () => {
      try {
        const response = await fetch("http://localhost/biblioteca-api/mas-buscados.php");
        const data = await response.json();

        console.log(data); // Aquí puedes ver lo que devuelve la API

        if (data.success) {
          setLibros(data.libros); // Si la respuesta es exitosa, guarda los libros
        } else {
          setLibros([]); // Si no hay libros, vacía la lista
          setError("No se encontraron libros."); // Mensaje de error en caso de que no haya libros
        }
      } catch (error) {
        console.error("Error al obtener los libros:", error); // Si hay un error, lo muestra en consola
        setLibros([]); // En caso de error, vaciar la lista
        setError("Hubo un problema con la conexión al servidor.");
      }
    };

    obtenerLibros();
  }, []);

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  const librosFiltrados = libros.filter((libro) =>
    libro.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="principal-container">
      {/* Barra de búsqueda */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar libro"
          value={busqueda}
          onChange={handleBusqueda}
        />
        <button>Buscar</button>
      </div>

      {/* Barra de navegación */}
      <nav className="navigation-bar">
        <Link to="/devoluciones">Devoluciones</Link>
        <Link to="/agregar-cliente">Agregar Cliente</Link>
        <Link to="/agregar-libro">Agregar Libro</Link>
        <Link to="/eliminar-libro">Eliminar Libro</Link>
      </nav>

      {/* Título "Más Buscados" */}
      <h2>Más Buscados</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar mensaje de error si ocurre */}

      {/* Lista de los 10 libros más prestados */}
      <ul className="libros-lista">
        {librosFiltrados.length > 0 ? (
          librosFiltrados.map((libro, index) => (
            <li key={index}>
              <strong>{libro.nombre}</strong> - {libro.nombreAutor}
            </li>
          ))
        ) : (
          <p>No hay libros disponibles.</p> // Mostrar mensaje si no hay libros
        )}
      </ul>
    </div>
  );
};

export default Principal;

