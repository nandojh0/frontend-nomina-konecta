// src/components/EmpleadoList.js
import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import Logout from '../components/Logout';
import Swal from 'sweetalert2'; // Importa SweetAlert2 

const EmpleadoList = () => {
    const { token } = useContext(AuthContext); // Acceder al token desde AuthContext
    const { empleados, setEmpleados } = useContext(AppContext); // Acceder a empleados y su setter
    const [error, setError] = useState('');


    useEffect(() => {
        const fetchEmpleados = async () => {
            Swal.fire({
                title: 'Cargando Empleados...',
                text: 'Por favor espera un momento',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            try {
                const apiUrl = process.env.REACT_APP_API_URL;
                const response = await fetch(`${apiUrl}/api/empleados`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }

                const data = await response.json();
                setEmpleados(data); // Actualiza la lista de empleados en el contexto
            } catch (err) {
                setError(err.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error inesperado',
                    text: err.message || 'Algo salió mal. Por favor, inténtelo nuevamente.',
                });
            } finally {
                Swal.close(); // Finaliza la carga
            }
        };

        // Solo llama a fetchEmpleados si el token está presente
        if (token) {
            fetchEmpleados();
        }

    }, [token, setEmpleados]); // Agregar token aquí

    
    return (
        <div className="container">
            <h2 className="text-center my-4">Lista de Empleados</h2>

            {error && (
                <div className="alert alert-danger text-center">{error}</div>
            )}

            <div className="d-flex justify-content-between my-3">
                <Link to="/EmpleadoForm">
                    <button className="btn btn-primary">Añadir Empleado</button>
                </Link>
                <Link to="/SolicitudesList">
                    <button className="btn btn-secondary">Lista de Solicitudes</button>
                </Link>
                {/* Botón de cerrar sesión */}
            <Logout /> {/* Componente Logout */}
            </div>

            {empleados.length > 0 ? ( // Verifica si hay empleados
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>Nombre</th>
                            <th>Salario</th>
                            <th>Fecha de Ingreso</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleados.map((empleado, index) => (
                            <tr key={index}>
                                <td>{empleado.nombre}</td>
                                <td>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(empleado.salario)}</td>
                                <td>{new Date(empleado.fecha_ingreso).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center">No hay empleados para mostrar.</p> // Mensaje si no hay empleados
            )}
        </div>
    );
};

export default EmpleadoList;
