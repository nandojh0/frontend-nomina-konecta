// src/components/SolicitudesForm.jsx
import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import { useNavigate } from 'react-router-dom';



const SolicitudesForm = () => {
    const { setSolicitudes, empleados } = useContext(AppContext);
    const { token } = useContext(AuthContext);
    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [resumen, setResumen] = useState('');
    const [idEmpleado, setIdEmpleado] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newSolicitud = {
            codigo,
            descripcion,
            resumen,
            id_empleado: idEmpleado,
        };

        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/api/solicitudes`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSolicitud),
            });
            if (!response.ok) {
                const errorData = await response.json();
                Swal.fire({
                    icon: 'warning',
                    title: 'Error de datos',
                    text: errorData.message || 'Error al crear la solicitud',
                });
                
                return;
            }

            const createdSolicitud = await response.json();
            setSolicitudes(prevSolicitudes => [...prevSolicitudes, createdSolicitud]);
            // Limpiar campos después de enviar
            setCodigo('');
            setDescripcion('');
            setResumen('');
            setIdEmpleado('');

            // Usar SweetAlert2 para mostrar mensaje de éxito
            Swal.fire({
                icon: 'success',
                title: 'Solicitud Creada',
                text: 'La solicitud se ha creado exitosamente.',
            });
            navigate('/SolicitudesList');
        } catch (err) {
            // Usar SweetAlert2 para mostrar el mensaje de error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message,
            });
        }
    };

    return (
        <div className="container mt-5">
            <h2>Crear Nueva Solicitud</h2>
            <form onSubmit={handleSubmit} className="border p-4 shadow-sm rounded">
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        placeholder="Código de la solicitud"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción:</label>
                    <textarea
                        id="descripcion"
                        className="form-control"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        placeholder="Descripción"
                        required
                        rows="4" // Número de filas visible
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="resumen" className="form-label">Resumen:</label>
                    <textarea
                        id="resumen"
                        className="form-control"
                        value={resumen}
                        onChange={(e) => setResumen(e.target.value)}
                        placeholder="Resumen"
                        required
                        rows="4" // Número de filas visible
                    />
                </div>
                <div className="mb-3">
                    <select
                        className="form-select"
                        value={idEmpleado}
                        onChange={(e) => setIdEmpleado(e.target.value)}
                        required
                    >
                        <option value="">Seleccionar Empleado</option>
                        {empleados.map((empleado) => (
                            <option key={empleado.id} value={empleado.id}>
                                {empleado.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
                <button 
                    type="button" 
                    className="btn btn-secondary ms-3" 
                    onClick={() => navigate('/SolicitudesList')} // Navegar a SolicitudesList
                >
                    Cancelar
                </button>
            </form>
        </div>
    );
};

export default SolicitudesForm;
