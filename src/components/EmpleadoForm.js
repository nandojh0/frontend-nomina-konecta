import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importa SweetAlert2

const EmpleadoForm = () => {
    const { token } = useContext(AuthContext); // Acceder al token desde AuthContext
    const { empleados, setEmpleados } = useContext(AppContext);
    const [nombre, setNombre] = useState('');
    const [fecha_ingreso, setFechaIngreso] = useState('');
    const [salario, setSalario] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuevoEmpleado = {
            nombre,
            fecha_ingreso,
            salario: Number(salario), // Convierte el salario a número
        };

        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/api/empleados`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // Agregar token aquí
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoEmpleado),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Obtener datos de error
                let errorMessage = 'Error al agregar el empleado';
                switch (response.status) {
                    case 400:
                        errorMessage = errorData.message || 'Solicitud incorrecta. Verifique los datos ingresados.';
                        break;
                    case 401:
                        errorMessage = 'No autorizado. Por favor, inicie sesión nuevamente.';
                        break;
                    case 403:
                        errorMessage = 'Acceso denegado. No tiene permiso para realizar esta acción.';
                        break;
                    case 404:
                        errorMessage = errorData.message || 'El recurso no fue encontrado.';
                        break;
                    case 500:
                        errorMessage = 'Error del servidor. Por favor, inténtelo más tarde.';
                        break;
                    default:
                        errorMessage = errorData.message || 'Error desconocido. Intente nuevamente.';
                }

                // Muestra el error con SweetAlert2
                Swal.fire({
                    icon: 'warning',
                    text: errorMessage,
                });

                return; // Detiene la ejecución aquí
            }

            const data = await response.json();
            setEmpleados([...empleados, data]);
            setNombre('');
            setFechaIngreso('');
            setSalario('');

            // Mostrar éxito al agregar empleado con SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Empleado agregado',
                timer: 4000,
                text: 'El empleado se ha agregado correctamente.',
            });

            // Navegar a la lista de empleados después de la inserción
            navigate('/EmpleadoList');
        } catch (err) {
            console.error('Error:', err);

            // Muestra un error general con SweetAlert2
            Swal.fire({
                icon: 'error',
                title: 'Error inesperado',
                text: err.message || 'Algo salió mal. Por favor, inténtelo nuevamente.',
            });
        }
    };

    const handleBack = () => {
        navigate('/EmpleadoList'); // Navegar a EmpleadoList cuando se hace clic en el botón "Volver"
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Agregar Empleado</h2>
            <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Nombre"
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="fecha_ingreso" className="form-label">Fecha de Ingreso</label>
                    <input
                        type="date"
                        id="fecha_ingreso"
                        className="form-control"
                        value={fecha_ingreso}
                        onChange={(e) => setFechaIngreso(e.target.value)}
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="salario" className="form-label">Salario</label>
                    <input
                        type="number"
                        id="salario"
                        className="form-control"
                        value={salario}
                        onChange={(e) => setSalario(e.target.value)}
                        placeholder="Salario"
                        required
                    />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Agregar Empleado</button>
                    <button type="button" onClick={handleBack} className="btn btn-secondary ms-3">Volver a Empleado List</button>
                </div>
            </form>
        </div>
    );
};

export default EmpleadoForm;
