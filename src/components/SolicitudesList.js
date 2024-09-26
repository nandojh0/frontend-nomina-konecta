// src/components/SolicitudesList.jsx
import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importa SweetAlert2



const SolicitudesList = () => {
    const { token } = useContext(AuthContext); // Acceder al token desde AuthContext
    const { solicitudes, setSolicitudes } = useContext(AppContext); // Acceder a solicitudes y su setter
    const [error, setError] = useState('');


    useEffect(() => {
        const fetchSolicitudes = async () => {

            Swal.fire({
                title: 'Cargando Solicitudes...',
                text: 'Por favor espera un momento',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            try {
                const response = await fetch('http://localhost:3002/api/solicitudes', {
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
                setSolicitudes(data); // Actualiza la lista de solicitudes en el contexto
            } catch (err) {
                setError(err.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error inesperado',
                    text: err.message || 'Algo salió mal. Por favor, inténtelo nuevamente.',
                });
            }finally {
                Swal.close();
            }
        };

        // Solo llama a fetchSolicitudes si el token está presente
        if (token) {
            fetchSolicitudes();
        }

    }, [token, setSolicitudes]); // Agregar token aquí

    // Función para eliminar una solicitud con SweetAlert2
    const handleDelete = async (solicitudId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const apiUrl = process.env.REACT_APP_API_URL;
                    const response = await fetch(`${apiUrl}/api/solicitudes/${solicitudId}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Error al eliminar la solicitud');
                    }

                    // Actualiza la lista de solicitudes después de eliminar
                    setSolicitudes(prevSolicitudes => prevSolicitudes.filter(solicitud => solicitud.solicitud_id !== solicitudId));

                    Swal.fire(
                        'Eliminado!',
                        'La solicitud ha sido eliminada.',
                        'success'
                    );
                } catch (err) {
                    setError(err.message);
                }
            }
        });
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Lista de Solicitudes</h2>

            {error && (
                <div className="alert alert-danger text-center">{error}</div>
            )}

            <div className="mb-3">
                <Link to="/SolicitudesForm">
                    <button className="btn btn-primary mr-2">Añadir Solicitud</button>
                </Link>
                <Link to="/EmpleadoList">
                    <button className="btn btn-secondary">Volver a Empleado List</button>
                </Link>
            </div>

            {solicitudes.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Descripción</th>
                            <th>Resumen</th>
                            <th>Nombre empleado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {solicitudes.map((solicitud) => (
                            <tr key={solicitud.id}>
                                <td>{solicitud.codigo}</td>
                                <td>{solicitud.descripcion}</td>
                                <td>{solicitud.resumen}</td>
                                <td>{solicitud.nombre}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(solicitud.solicitud_id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay solicitudes para mostrar.</p>
            )}
        </div>
    );
};

export default SolicitudesList;
