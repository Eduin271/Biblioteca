import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Prestamos.css";

const Prestamos = () => {
  const [prestamos, setPrestamos] = useState([]);
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

  return (
    <div className="gestion-prestamos">
      <h2>Gestión de Préstamos</h2>
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
          {prestamos.map((prestamo) => (
            <tr key={prestamo.idPrestamo}>
              <td>{prestamo.idPrestamo}</td>
              <td>{prestamo.fechaPrestamo}</td>
              <td>{prestamo.estado === "A" ? "Activo" : "Inactivo"}</td>
              <td>{prestamo.empleado}</td>
              <td>{prestamo.cliente}</td>
              <td>{prestamo.biblioteca}</td>
              <td>
                <button onClick={() => navigate(`/editar-prestamo/${prestamo.idPrestamo}`)}>
                  Editar
                </button>
                <button onClick={() => console.log("Eliminar", prestamo.idPrestamo)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Prestamos;
