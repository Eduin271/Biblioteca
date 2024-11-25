
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Principal = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Eliminar el token
        navigate('/'); // Redirigir al login
    };

    return (
        <div>
            <h1>Pantalla Principal</h1>
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
};

export default Principal;
