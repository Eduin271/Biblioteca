
import React, { useState, useEffect } from "react";
import axios from "axios";

const ListaLibros = () => {
    const [libros, setLibros] = useState([]);
    const [mensaje, setMensaje] = useState("");
  
    useEffect(() => {
      axios
        .get("http://localhost/libros.php")
        .then((response) => {
          if (response.data.success) {
            setLibros(response.data.data);
          } else {
            setMensaje("Error al cargar libros.");
          }
        })
        .catch(() => setMensaje("Error de conexión con el servidor."));
    }, []);
  
    return (
      <div>
        <h2>Lista de Libros</h2>
        {mensaje && <p>{mensaje}</p>}
        <ul>
          {libros.map((libro) => (
            <li key={libro.idLibro}>
              {libro.nombreLibro} - Categoría: {libro.Categoria}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ListaLibros;
  