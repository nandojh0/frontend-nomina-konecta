// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Inicializa el token desde localStorage
    const [token, setToken] = useState(localStorage.getItem('token') || null);


    // Función para iniciar sesión
    const login = (token) => {
        setToken(token);
        localStorage.setItem('token', token); // Guarda el token en localStorage
        console.log('Token almacenado:', token); // Mensaje de depuración
    };

    // Función para cerrar sesión
    const logout = () => {
        setToken(null);
        localStorage.removeItem('token'); // Elimina el token de localStorage
    };

    // Función para refrescar el token
    const refreshAccessToken = useCallback(async () => {
        const storedToken = localStorage.getItem('token'); // Obtiene el token de localStorage
        console.log('storedToken enviado:', storedToken); // Mensaje de depuración
        if (!storedToken) {
            logout(); // Si no hay token, cierra sesión
            return;
        }

        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/api/auth/refresh-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: storedToken }), // Envía el token para obtener uno nuevo
            });

            if (!response.ok) {
                logout(); // Si no se puede refrescar, cierra sesión
                return;
            }

            const data = await response.json();
            setToken(data.token); // Actualiza el token
            localStorage.setItem('token', data.token); // Almacena el nuevo token
        } catch (error) {
            console.error('Error al refrescar el token:', error);
            logout(); // Cierra sesión en caso de error
        }
    }, []); // Dependencias vacías

    // Efecto para refrescar el token periódicamente
    useEffect(() => {

        const intervalId = setInterval(() => {
            refreshAccessToken(); // Intenta refrescar el token
        }, 50 * 60 * 1000); // Ajusta según sea necesario

        return () => clearInterval(intervalId); // Limpia el intervalo al desmontar
    }, [refreshAccessToken]); // Dependencias

    return (
        <AuthContext.Provider value={{ token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
