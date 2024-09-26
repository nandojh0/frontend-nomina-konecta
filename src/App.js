import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import EmpleadoForm from './components/EmpleadoForm';
import EmpleadoList from './components/EmpleadoList';
import SolicitudesForm from './components/SolicitudesForm';
import SolicitudesList from './components/SolicitudesList';
import { AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // Asegúrate de importar ProtectedRoute
import 'bootstrap/dist/css/bootstrap.min.css';




const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Efecto para manejar el almacenamiento del token
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token'); // Asegúrate de limpiar el token si es null
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
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
        </AuthContext.Provider>
    );
};

export default App;
