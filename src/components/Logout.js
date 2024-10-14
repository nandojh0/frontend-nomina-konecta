// src/components/Logout.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Para redireccionar después del logout

const Logout = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate(); // Hook para redirigir

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirigir a la página de login después de cerrar sesión
    };

    return <button onClick={handleLogout} className="btn btn-danger">Cerrar Sesión</button>;
};

export default Logout;
