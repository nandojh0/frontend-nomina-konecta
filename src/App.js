import './App.css';
import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import EmpleadoForm from './components/EmpleadoForm';
import EmpleadoList from './components/EmpleadoList';
import SolicitudesForm from './components/SolicitudesForm';
import SolicitudesList from './components/SolicitudesList';
import ProtectedRoute from './components/ProtectedRoute'; // Asegúrate de importar ProtectedRoute
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
    const { token } = useContext(AuthContext);
    // Efecto para manejar el almacenamiento del token
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token'); // Asegúrate de limpiar el token si es null
        }
    }, [token]);

    return (
            <Router>
                <Routes>
                    {/* Rutas públicas */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Rutas protegidas */}
                    <Route
                        path="/EmpleadoForm"
                        element={
                            <ProtectedRoute token={token}>
                                <EmpleadoForm />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/EmpleadoList"
                        element={
                            <ProtectedRoute token={token}>
                                <EmpleadoList />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/SolicitudesForm"
                        element={
                            <ProtectedRoute token={token}>
                                <SolicitudesForm />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/SolicitudesList"
                        element={
                            <ProtectedRoute token={token}>
                                <SolicitudesList />
                            </ProtectedRoute>
                        }
                    />

                    {/* Redirección por defecto */}
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
    );
};

export default App;
