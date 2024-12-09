import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/GestionCliente.css";

const GestionClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await fetch("http://localhost/biblioteca-api/gestion-cliente.php", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      });
      const data = await response.json();
      if (data.success) {
        setClientes(data.clientes);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };

  const handleDelete = async (idCliente) => {
    console.log("ID Cliente para eliminar:", idCliente); // Verificar que se reciba el idCliente

    if (window.confirm("¿Estás seguro de eliminar este cliente?")) {
      try {
        const response = await fetch(
          `http://localhost/biblioteca-api/gestion-cliente.php`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "same-origin",
            body: JSON.stringify({ idCliente }), // Envío del idCliente en el cuerpo de la solicitud
          }
        );

        if (!response.ok) {
          throw new Error(`Error en la respuesta: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Respuesta del backend:", data); // Verificar la respuesta del backend

        if (data.success) {
          alert("Cliente eliminado exitosamente");
          fetchClientes(); // Refrescar la lista de clientes después de la eliminación
        } else {
          console.error("Error al eliminar cliente:", data.message);
          alert(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error("Error al eliminar cliente:", error);
        alert("Error al eliminar cliente. Intenta de nuevo.");
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nombreCompleto.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="gestion-clientes">
      <div className="header">
        <h2>Gestión de Clientes</h2>
        <button className="back-button" onClick={() => navigate("/principal")} title="Regresar al menú principal">
          ×
        </button>
      </div>
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <button onClick={() => navigate("/agregar-cliente")} className="add-button">
        Agregar Cliente
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredClientes.map((cliente) => (
            <tr key={cliente.idCliente}>
              <td>{cliente.idCliente}</td>
              <td>{cliente.nombreCompleto}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.correo}</td>
              <td>
                <button onClick={() => navigate(`/editar-cliente/${cliente.idCliente}`)}>Editar</button>
                <button onClick={() => handleDelete(cliente.idCliente)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionClientes;



