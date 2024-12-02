import React, { useState} from "react";
import axios from "axios";

const AgregarCategoria = () => {
    const [categoria, setCategoria] = useState("");
    const [estado, setEstado] = useState("A");
    const [mensaje, setMensaje] = useState("");
  
    const handleAgregarCategoria = (e) => {
      e.preventDefault();
      if (!categoria) {
        setMensaje("Por favor ingresa una categoría.");
        return;
      }
  
      axios
        .post("http://localhost/biblioteca-api/editar-categoria.php", {
          Categoria: categoria,
          estado: estado,
        })
        .then((response) => {
          if (response.data.success) {
            setMensaje("Categoría agregada exitosamente.");
            setCategoria("");
          } else {
            setMensaje(response.data.message || "Error al agregar categoría.");
          }
        })
        .catch(() => setMensaje("Error de conexión con el servidor."));
    };
  
    return (
      <div>
        <h2>Agregar Categoría</h2>
        <form onSubmit={handleAgregarCategoria}>
          <div>
            <label>Nombre de la Categoría:</label>
            <input
              type="text"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            />
          </div>
          <div>
            <label>Estado:</label>
            <select value={estado} onChange={(e) => setEstado(e.target.value)}>
              <option value="A">Activo</option>
              <option value="I">Inactivo</option>
            </select>
          </div>
          <button type="submit">Agregar Categoría</button>
        </form>
        {mensaje && <p>{mensaje}</p>}
      </div>
    );
  };
  
  export default AgregarCategoria;
  