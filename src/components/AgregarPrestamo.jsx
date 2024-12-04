import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/AgregarPrestamo.css";

const AgregarPrestamo = () => {
  const [empleados, setEmpleados] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [bibliotecas, setBibliotecas] = useState([]);
  const [libros, setLibros] = useState([]);
  const [formData, setFormData] = useState({
    idEmpleado: "",
    idCliente: "",
    idBiblioteca: "",
    idLibro: "",
    fechaPrestamo: "",
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
        const librosRes = await fetch("http://localhost/biblioteca-api/prestamo-libro.php");

        setEmpleados(await empleadosRes.json());
        setClientes(await clientesRes.json());
        setBibliotecas(await bibliotecasRes.json());
        const librosData = await librosRes.json();

        if (Array.isArray(librosData)) {
          setLibros(librosData);
        } else {
          console.error("Error: La respuesta de libros no es un array válido.");
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost/biblioteca-api/prestamos.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error en la respuesta de la API:", errorText);
        throw new Error("Error en la respuesta de la API");
      }

      const data = await response.json();
      console.log("Respuesta de la API:", data);

      if (data.success) {
        alert("Préstamo registrado exitosamente");
        navigate("/prestamos");
      } else {
        alert(`Error al registrar el préstamo: ${data.message}`);
      }
    } catch (error) {
      console.error("Error al enviar datos:", error);
      alert("Error al enviar los datos. Por favor, inténtelo de nuevo más tarde.");
    }
  };

  return (
    <div className="agregar-prestamo">
      <h2>Agregar Préstamo</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Empleado:</label>
          <select name="idEmpleado" value={formData.idEmpleado} onChange={handleChange} required>
            <option value="">Seleccione un empleado</option>
            {empleados.map((empleado) => (
              <option key={empleado.idEmpleado} value={empleado.idEmpleado}>
                {empleado.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Cliente:</label>
          <select name="idCliente" value={formData.idCliente} onChange={handleChange} required>
            <option value="">Seleccione un cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.idCliente} value={cliente.idCliente}>
                {cliente.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Biblioteca:</label>
          <select name="idBiblioteca" value={formData.idBiblioteca} onChange={handleChange} required>
            <option value="">Seleccione una biblioteca</option>
            {bibliotecas.map((biblioteca) => (
              <option key={biblioteca.idBiblioteca} value={biblioteca.idBiblioteca}>
                {biblioteca.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Libro:</label>
          <select name="idLibro" value={formData.idLibro} onChange={handleChange} required>
            <option value="">Seleccione un libro</option>
            {Array.isArray(libros) && libros.map((libro) => (
              <option key={libro.idLibro} value={libro.idLibro}>
                {libro.nombreLibro}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Fecha del Préstamo:</label>
          <input
            type="date"
            name="fechaPrestamo"
            value={formData.fechaPrestamo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Estado:</label>
          <select name="estado" value={formData.estado} onChange={handleChange} required>
            <option value="A">Activo</option>
            <option value="I">Inactivo</option>
          </select>
        </div>
        <div className="buttons">
          <button type="submit">Guardar</button>
          <button type="button" onClick={() => navigate("/prestamos")}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgregarPrestamo;



