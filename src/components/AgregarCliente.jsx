import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/AgregarCliente.css";

const AgregarCliente = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        pnombre: '',
        snombre: '',
        papellido: '',
        sapellido: '',
        correo: '',
        telefono: '',
    });

    const [message, setMessage] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.pnombre || !formData.papellido || !formData.correo || !formData.telefono) {
            setMessage('Por favor, completa todos los campos obligatorios');
            return;
        }

        try {
            const response = await fetch('http://localhost/biblioteca-api/gestion-cliente.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                setFormData({
                    pnombre: '',
                    snombre: '',
                    papellido: '',
                    sapellido: '',
                    correo: '',
                    telefono: '',
                });
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000); // Ocultar después de 3 segundos
            } else {
                setMessage(result.message || 'Error al agregar el cliente');
            }
        } catch (error) {
            setMessage('Error al comunicarse con el servidor');
        }
    };

    const handleBack = () => {
        navigate('/gestionar-cliente'); // Redirige a la pantalla de gestión de cliente
    };

    return (
        <div className="agregar-cliente-container">
            <button className="back-button" onClick={handleBack}>x</button>
            <h2>Agregar Nuevo Cliente</h2>
            {message && <p className="error-message">{message}</p>}
            {showSuccess && <div className="success-alert">Cliente agregado con éxito</div>}
            <form className="agregar-cliente-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Primer Nombre:</label>
                    <input
                        type="text"
                        name="pnombre"
                        value={formData.pnombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Segundo Nombre:</label>
                    <input
                        type="text"
                        name="snombre"
                        value={formData.snombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Primer Apellido:</label>
                    <input
                        type="text"
                        name="papellido"
                        value={formData.papellido}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Segundo Apellido:</label>
                    <input
                        type="text"
                        name="sapellido"
                        value={formData.sapellido}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Correo Electrónico:</label>
                    <input
                        type="email"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Teléfono:</label>
                    <input
                        type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="buttons">
                    <button type="submit">Agregar Cliente</button>
                </div>
            </form>
        </div>
    );
};

export default AgregarCliente;



