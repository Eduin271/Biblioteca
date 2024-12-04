import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Libros.css";

const GestionLibros = () => {
  const [libros, setLibros] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchLibros = async () => {
    try {
      const response = await fetch("http://localhost/biblioteca-api/libros.php");
      const data = await response.json();
      if (data.success) {
        setLibros(data.libros);
      }
    } catch (error) {
      console.error("Error al obtener libros:", error);
    }
  };

  const handleDelete = async (idLibro) => {
    if (!window.confirm("¿Seguro que deseas eliminar este libro?")) return;

    try {
      const response = await fetch("http://localhost/biblioteca-api/libros.php", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idLibro }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Libro eliminado correctamente");
        setLibros((prevLibros) => prevLibros.filter((libro) => libro.idLibro !== idLibro));
      } else {
        alert(data.message || "No se pudo eliminar el libro");
      }
    } catch (error) {
      console.error("Error al eliminar libro:", error);
    }
  };

  const handleEdit = (idLibro) => {
    navigate(`/editar-libro/${idLibro}`);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    fetchLibros();
  }, []);

  const filteredLibros = libros.filter((libro) =>
    libro.nombreLibro.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="gestion-libros">
      <div className="header">
        <h2 className="title">Gestión de Libros</h2>
        <div className="actions">
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar libro..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-bar"
            />
            <Link to="/agregar-libro" className="add-button">
              Nuevo
            </Link>
          </div>
          <button className="close-button" onClick={() => navigate("/principal")}>
            X
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredLibros.map((libro) => (
            <tr key={libro.idLibro}>
              <td>{libro.nombreLibro}</td>
              <td>{libro.Categoria}</td>
              <td>
                <button onClick={() => handleEdit(libro.idLibro)}>Editar</button>
                <button onClick={() => handleDelete(libro.idLibro)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionLibros;





