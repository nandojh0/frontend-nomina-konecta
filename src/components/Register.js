import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3002/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (response.ok) {
                // Mensaje de éxito con SweetAlert2
                Swal.fire({
                    icon: 'success',
                    title: 'Registro exitoso!',
                    text: 'Puedes iniciar sesión ahora.',
                });

                // Resetear los campos
                setUsername('');
                setPassword('');
            } else {
                // Mensaje de error con SweetAlert2
                Swal.fire({
                    icon: 'warning',
                    text: data.message || 'Error en el registro. Inténtalo de nuevo.',
                });
            }
        } catch (error) {
            // Mensaje de error en caso de fallo en la conexión
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error en el registro. Inténtalo de nuevo.',
            });
        }
    };
    const handleLoginRedirect = () => {
        navigate('/login'); // Redirigir a la página de inicio de sesión
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h2 className="text-center">Registro</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Nombre de Usuario:</label>
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
                                <button type="submit" className="btn btn-primary w-100">Registrarse</button>
                            </form>
                            <div className="text-center mt-3">
                                <button 
                                    className="btn btn-link" 
                                    onClick={handleLoginRedirect}
                                >
                                    ¿Ya tienes una cuenta? Iniciar sesión
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
