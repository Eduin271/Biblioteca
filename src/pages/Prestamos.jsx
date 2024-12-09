import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Prestamos.css";

const Prestamos = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchPrestamos = async () => {
    try {
      const response = await fetch("http://localhost/biblioteca-api/prestamos.php");
      const data = await response.json();
      if (data.success) {
        setPrestamos(data.prestamos);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error al obtener préstamos:", error);
    }
  };

  useEffect(() => {
    fetchPrestamos();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredPrestamos = prestamos.filter((prestamo) =>
    prestamo.cliente.toLowerCase().includes(searchQuery)
  );

  const handleDelete = async (idPrestamo) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este préstamo?")) {
      try {
        const response = await fetch("http://localhost/biblioteca-api/prestamos.php", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idPrestamo }),
        });

        const data = await response.json();

        if (data.success) {
          alert("Préstamo eliminado exitosamente");
          fetchPrestamos(); // Refrescar la lista de préstamos
        } else {
          alert("Error al eliminar el préstamo: " + data.message);
        }
      } catch (error) {
        console.error("Error al eliminar préstamo:", error);
        alert("Error al eliminar el préstamo");
      }
    }
  };

  return (
    <div className="gestion-prestamos">
      <div className="header">
        <h2>Gestión de Préstamos</h2>
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
      <button onClick={() => navigate("/agregar-prestamo")} className="add-button">
        Nuevo Préstamo
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
          {filteredPrestamos.map((prestamo) => (
            <tr key={prestamo.idPrestamo}>
              <td>{prestamo.idPrestamo}</td>
              <td>{prestamo.fechaPrestamo}</td>
              <td>{prestamo.estado === "A" ? "Activo" : "Inactivo"}</td>
              <td>{prestamo.empleado}</td>
              <td>{prestamo.cliente}</td>
              <td>{prestamo.biblioteca}</td>
              <td>
                <button onClick={() => navigate(`/editar-prestamo/${prestamo.idPrestamo}`)}>Editar</button>
                <button onClick={() => handleDelete(prestamo.idPrestamo)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Prestamos;


