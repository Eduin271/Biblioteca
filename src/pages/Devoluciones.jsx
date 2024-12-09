import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Devoluciones.css";

const Devoluciones = () => {
  const [devoluciones, setDevoluciones] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchDevoluciones = async () => {
    try {
      const response = await fetch("http://localhost/biblioteca-api/devoluciones.php");
      const data = await response.json();
      if (data.success) {
        setDevoluciones(data.devoluciones);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error al obtener devoluciones:", error);
    }
  };

  useEffect(() => {
    fetchDevoluciones();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredDevoluciones = devoluciones.filter((devolucion) =>
    devolucion.cliente.toLowerCase().includes(searchQuery)
  );

  const handleDelete = async (idDevolucion) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar la devolución?")) {
      try {
        const response = await fetch("http://localhost/biblioteca-api/devoluciones.php", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idDevolucion }),
        });

        const data = await response.json();

        if (data.success) {
          alert("Devolución eliminada exitosamente");
          fetchDevoluciones(); // Refrescar la lista de devoluciones
        } else {
          alert("Error al eliminar la devolución: " + data.message);
        }
      } catch (error) {
        console.error("Error al eliminar la devolución:", error);
        alert("Error al eliminar la devolución");
      }
    }
  };

  return (
    <div className="gestion-devoluciones">
      <div className="header">
        <h2>Gestión de Devoluciones</h2>
        <button className="back-button" onClick={() => navigate("/principal")} title="Regresar al menú principal">
          ×
        </button>
      </div>
      <input
        type="text"
        placeholder="Buscar por cliente"
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <button onClick={() => navigate("/agregar-devolucion")} className="add-button">
        Nueva Devolución
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Empleado</th>
            <th>Cliente</th>
            <th>Biblioteca</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredDevoluciones.map((devolucion) => (
            <tr key={devolucion.idDevolucion}>
              <td>{devolucion.idDevolucion}</td>
              <td>{devolucion.fechaDevolucion}</td>
              <td>{devolucion.estado === "A" ? "Activo" : "Inactivo"}</td>
              <td>{devolucion.empleado}</td>
              <td>{devolucion.cliente}</td>
              <td>{devolucion.biblioteca}</td>
              <td>
                <button onClick={() => navigate(`/editar-devolucion/${devolucion.idDevolucion}`)}>Editar</button>
                <button onClick={() => handleDelete(devolucion.idDevolucion)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Devoluciones;





