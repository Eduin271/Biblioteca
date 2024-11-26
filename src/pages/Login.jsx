import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/login.css"; // Importar los estilos
import usuarioIcon from "../assets/images/usuario.png";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar cualquier error anterior

    try {
      const response = await fetch("http://localhost/biblioteca-api/auth.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, contrasena }),
      });

      const data = await response.json();

      if (data.success) {
        // Guardar el token en localStorage
        localStorage.setItem("token", data.token);

        // Redirigir a la pantalla principal
        navigate("/principal");
      } else {
        // Mostrar mensaje de error
        setError(data.message || "Error de autenticación");
      }
    } catch (error) {
      setError("Hubo un problema con el servidor. Intenta más tarde.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-icon">
          <img src={usuarioIcon} alt="User Icon" className="login-icon" />
        </div>
        <h2>Inicio de Sesión</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
        
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="login-input"
            required
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

