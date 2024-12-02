import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style/EditarLibro.css";

const EditarLibro = () => {
  const { idLibro } = useParams(); // ID del libro a editar (viene de la URL)
  const navigate = useNavigate();

  const [nombreLibro, setNombreLibro] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [autores, setAutores] = useState([]);
  const [idCategoria, setIdCategoria] = useState("");
  const [idAutor, setIdAutor] = useState(""); // Asegúrate de tener esta variable de estado
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Cargar datos del libro a editar
  useEffect(() => {
    const fetchLibro = async () => {
      try {
        const response = await fetch(
          `http://localhost/biblioteca-api/editar-libro.php?id=${idLibro}`
        );
        const data = await response.json();
        if (data.success) {
          setNombreLibro(data.libro.nombreLibro);
          setIdCategoria(data.libro.idCategoriaLibro);
          setIdAutor(data.libro.idAutor); // Asegúrate de asignar correctamente el autor
        } else {
          setError("Error al cargar los datos del libro");
        }
      } catch (error) {
        setError("Error al obtener los datos del libro");
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchLibro();
  }, [idLibro]);

  // Cargar categorías y autores
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("http://localhost/biblioteca-api/editar-categoria.php");
        const data = await response.json();
        if (data.success) {
          setCategorias(data.categorias);
        } else {
          setError("Error al cargar categorías");
        }
      } catch (error) {
        setError("Error al obtener categorías");
      }
    };

    const fetchAutores = async () => {
      try {
        const response = await fetch("http://localhost/biblioteca-api/autores.php");
        const data = await response.json();
        if (data.success) {
          setAutores(data.autores);
        } else {
          setError("Error al cargar autores");
        }
      } catch (error) {
        setError("Error al obtener autores");
      }
    };

    fetchCategorias();
    fetchAutores();
  }, []);

  // Manejar la actualización del libro
  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedLibro = {
      idLibro: parseInt(idLibro),
      nombreLibro,
      idCategoriaLibro: parseInt(idCategoria),
      idAutor: parseInt(idAutor), // Se asegura de que el autor se envíe correctamente
    };

    try {
      const response = await fetch("http://localhost/biblioteca-api/editar-libro.php", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedLibro),
      });

      const data = await response.json();
      if (data.success) {
        navigate("/gestion-libros"); // Redirigir a la lista de libros
      } else {
        setError("Error al actualizar el libro");
      }
    } catch (error) {
      setError("Error en la solicitud de actualización");
    }
  };

  return (
    <div className="editar-libro-container">
      <h2>Editar Libro</h2>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Cargando datos del libro...</p> // Muestra un mensaje mientras los datos están cargando
      ) : (
        <form onSubmit={handleUpdate}>
          <div>
            <label>Nombre del Libro:</label>
            <input
              type="text"
              value={nombreLibro}
              onChange={(e) => setNombreLibro(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Categoría:</label>
            <select
              value={idCategoria}
              onChange={(e) => setIdCategoria(e.target.value)}
              required
            >
              <option value="">Seleccionar categoría</option>
              {categorias.map((categoria) => (
                <option
                  key={categoria.idCategoriaLibro}
                  value={categoria.idCategoriaLibro}
                >
                  {categoria.Categoria} {/* Asegúrate de que el nombre del campo sea correcto */}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Autor:</label>
            <select
              value={idAutor}
              onChange={(e) => setIdAutor(e.target.value)} // Correctamente enlazado al autor
              required
            >
              <option value="">Seleccionar autor</option>
              {autores.map((autor) => (
                <option key={autor.idAutor} value={autor.idAutor}>
                  {autor.pnombre} {autor.snombre} {autor.papellido} {autor.sapellido}
                </option>
              ))}
            </select>
          </div>
          <div className="btn-container">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/gestionar-libros")}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              Guardar Cambios
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditarLibro;
