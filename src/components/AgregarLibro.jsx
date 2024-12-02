import React, { useState, useEffect } from 'react';
import '../style/AgregarLibro.css';

function AgregarLibro() {
  const [nombreLibro, setNombreLibro] = useState('');
  const [idCategoriaLibro, setIdCategoriaLibro] = useState('');
  const [idAutor, setIdAutor] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [autores, setAutores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Cargar las categorías y autores desde el servidor
    fetch('/http://localhost/biblioteca-api/categorias.php')
      .then(response => response.json())
      .then(data => setCategorias(data.categorias || []))
      .catch(error => setError('Error al cargar categorías'));

    fetch('http://localhost/biblioteca-api/autores.php')
      .then(response => response.json())
      .then(data => setAutores(data.autores || []))
      .catch(error => setError('Error al cargar autores'));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      nombreLibro,
      idCategoriaLibro,
      idAutor
    };

    fetch('http://localhost/biblioteca-api/libros.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          // Aquí podrías redirigir o limpiar el formulario
          alert('Libro agregado exitosamente');
        } else {
          setError('Hubo un problema al agregar el libro');
        }
      })
      .catch(error => setError('Error de conexión con el servidor'));
  };

  return (
    <div className="agregar-libro-container">
      <h2>Agregar Libro</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Nombre del Libro:</label>
          <input 
            type="text" 
            value={nombreLibro} 
            onChange={(e) => setNombreLibro(e.target.value)} 
            required 
          />
        </div>

        <div className="input-group">
          <label>Categoría:</label>
          <select 
            value={idCategoriaLibro} 
            onChange={(e) => setIdCategoriaLibro(e.target.value)} 
            required
          >
            <option value="">Seleccionar categoría</option>
            {categorias.map(categoria => (
              <option key={categoria.idCategoriaLibro} value={categoria.idCategoriaLibro}>
                {categoria.Categoria}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Autor:</label>
          <select 
            value={idAutor} 
            onChange={(e) => setIdAutor(e.target.value)} 
            required
          >
            <option value="">Seleccionar autor</option>
            {autores.map(autor => (
              <option key={autor.idAutor} value={autor.idAutor}>
                {autor.pnombre} {autor.snombre} {autor.papellido} {autor.sapellido}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Agregar Libro</button>
      </form>
    </div>
  );
}

export default AgregarLibro;
