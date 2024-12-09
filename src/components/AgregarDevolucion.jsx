import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select"; // Importar React-Select
import "../style/AgregarDevolucion.css";

const AgregarDevolucion = () => {
  const [empleados, setEmpleados] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [bibliotecas, setBibliotecas] = useState([]);
  const [prestamos, setPrestamos] = useState([]);
  const [formData, setFormData] = useState({
    idEmpleado: null,
    idCliente: null,
    idBiblioteca: null,
    idPrestamo: null,
    fechaDevolucion: "",
    estado: "A",
  });
  const navigate = useNavigate();

  // Fetch data for selects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const empleadosRes = await fetch("http://localhost/biblioteca-api/empleados.php");
        const clientesRes = await fetch("http://localhost/biblioteca-api/clientes.php");
        const bibliotecasRes = await fetch("http://localhost/biblioteca-api/bibliotecas.php");
        const prestamosRes = await fetch("http://localhost/biblioteca-api/prestamos.php");

        const empleadosData = await empleadosRes.json();
        const clientesData = await clientesRes.json();
        const bibliotecasData = await bibliotecasRes.json();
        const prestamosData = await prestamosRes.json();

        if (prestamosData.success && Array.isArray(prestamosData.prestamos)) {
          setPrestamos(prestamosData.prestamos);
        } else {
          console.error("Error: La respuesta de préstamos no es un array válido.");
        }

        setEmpleados(empleadosData);
        setClientes(clientesData);
        setBibliotecas(bibliotecasData);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, []);

  // Convertimos los datos para React-Select
  const toSelectOptions = (data, labelField, valueField) =>
    data.map((item) => ({
      label: item[labelField] || `Sin ${labelField}`,
      value: item[valueField] || `Sin ${valueField}`,
    }));

  // Manejar cambios en los select
  const handleChangeSelect = (selectedOption, { name }) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: selectedOption || null, // Guardar el objeto completo, no solo el valor
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Extraer valores del objeto seleccionado para enviar al servidor
      const dataToSend = {
        ...formData,
        idEmpleado: formData.idEmpleado ? formData.idEmpleado.value : null,
        idCliente: formData.idCliente ? formData.idCliente.value : null,
        idBiblioteca: formData.idBiblioteca ? formData.idBiblioteca.value : null,
        idPrestamo: formData.idPrestamo ? formData.idPrestamo.value : null,
        fechaDevolucion: formData.fechaDevolucion, // Aseguramos que este campo esté bien enviado
      };

      console.log("Datos a enviar:", dataToSend); // Para depuración

      const response = await fetch("http://localhost/biblioteca-api/devoluciones.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error en la respuesta de la API:", errorText);
        throw new Error("Error en la respuesta de la API");
      }

      const data = await response.json();
      console.log("Respuesta de la API:", data);

      if (data.success) {
        alert("Devolución registrada exitosamente");
        navigate("/devoluciones");
      } else {
        alert(`Error al registrar la devolución: ${data.message}`);
      }
    } catch (error) {
      console.error("Error al enviar datos:", error);
      alert("Error al enviar los datos. Por favor, inténtelo de nuevo más tarde.");
    }
  };

  return (
    <div className="agregar-devolucion">
      <h2>Agregar Devolución</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Empleado:</label>
          <Select
            options={toSelectOptions(empleados, "nombre", "idEmpleado")}
            name="idEmpleado"
            onChange={handleChangeSelect}
            value={formData.idEmpleado || null}
            placeholder="Seleccione un empleado"
          />
        </div>
        <div className="form-group">
          <label>Cliente:</label>
          <Select
            options={toSelectOptions(clientes, "nombre", "idCliente")}
            name="idCliente"
            onChange={handleChangeSelect}
            value={formData.idCliente || null}
            placeholder="Seleccione un cliente"
          />
        </div>
        <div className="form-group">
          <label>Biblioteca:</label>
          <Select
            options={toSelectOptions(bibliotecas, "nombre", "idBiblioteca")}
            name="idBiblioteca"
            onChange={handleChangeSelect}
            value={formData.idBiblioteca || null}
            placeholder="Seleccione una biblioteca"
          />
        </div>
        <div className="form-group">
          <label>Préstamo:</label>
          <Select
            options={toSelectOptions(prestamos, "idPrestamo", "idPrestamo")}
            name="idPrestamo"
            onChange={handleChangeSelect}
            value={formData.idPrestamo || null}
            placeholder="Seleccione un préstamo"
          />
        </div>
        <div className="form-group">
          <label>Fecha de la Devolución:</label>
          <input
            type="date"
            name="fechaDevolucion"
            value={formData.fechaDevolucion || ""}
            onChange={(e) =>
              setFormData((prevState) => ({ ...prevState, fechaDevolucion: e.target.value }))
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Estado:</label>
          <select
            name="estado"
            value={formData.estado}
            onChange={(e) =>
              setFormData((prevState) => ({ ...prevState, estado: e.target.value }))
            }
            required
          >
            <option value="A">Activo</option>
            <option value="I">Inactivo</option>
          </select>
        </div>
        <div className="buttons">
          <button type="submit">Guardar</button>
          <button type="button" onClick={() => navigate("/devoluciones")}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgregarDevolucion;




