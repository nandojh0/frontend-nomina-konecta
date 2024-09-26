// src/components/Logout.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Cambiado a AuthContext
import { useNavigate } from 'react-router-dom'; // Para redireccionar después del logout

const Logout = () => {
    const { setToken } = useContext(AuthContext); // Usar AuthContext para gestionar el token
    const navigate = useNavigate(); // Hook para redirigir

    const handleLogout = () => {
        setToken(null); // Limpiar el token en el contexto
        localStorage.removeItem('token'); // Limpiar el token en localStorage
        navigate('/login'); // Redirigir a la página de login después de cerrar sesión
    };

    return <button onClick={handleLogout} className="btn btn-danger">Cerrar Sesión</button>;
};

export default Logout;
