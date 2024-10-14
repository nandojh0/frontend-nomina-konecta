// src/components/Login.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importar SweetAlert2

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const apiUrl = process.env.REACT_APP_API_URL;

            const response = await fetch(`${apiUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                login(data.token); // Almacena el token usando el método login del contexto
                navigate('/EmpleadoList'); // Redirige a EmpleadoList después de iniciar sesión
            } else {
                // Usar SweetAlert2 para mostrar el mensaje de error
                Swal.fire({
                    icon: 'error',
                    title: 'Error de inicio de sesión',
                    text: data.message || 'Usuario o contraseña incorrectos',
                });
            }
        } catch (error) {
            // Usar SweetAlert2 para mostrar el error de conexión
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'Error en la conexión con el servidor',
            });
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Iniciar Sesión</h2>

            <form onSubmit={handleSubmit} className="border p-4 shadow-sm rounded">
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Usuario:</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
                <button
                    type="button"
                    className="btn btn-link ms-3"
                    onClick={() => navigate('/register')} // Navegar a Register
                >
                    Crear cuenta
                </button>
            </form>
        </div>
    );
};

export default Login;
