import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Libros.css";

const GestionLibros = () => {
  const [libros, setLibros] = useState([]);
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

  useEffect(() => {
    fetchLibros();
  }, []);

  return (
    <div className="gestion-libros">
      <div className="header">
        <h2>Gestión de Libros</h2>
        <Link to="/agregar-libro" className="add-button">
          <span>+</span>
        </Link>
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
          {libros.map((libro) => (
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
