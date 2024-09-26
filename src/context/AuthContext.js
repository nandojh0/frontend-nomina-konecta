// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const login = (token) => {
        setToken(token);
        localStorage.setItem('token', token); // Guarda el token en localStorage
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token'); // Elimina el token de localStorage
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
