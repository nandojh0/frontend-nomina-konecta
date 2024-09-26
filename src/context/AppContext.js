// src/context/AppContext.js
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null); // Obtener token de localStorage
    const [empleados, setEmpleados] = useState([]); // Estado para los empleados
    const [solicitudes, setSolicitudes] = useState([]); 

    return (
        <AppContext.Provider value={{ token, setToken, empleados, setEmpleados, solicitudes, setSolicitudes }}>
            {children}
        </AppContext.Provider>
    );
};
