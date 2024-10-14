// src/context/AppContext.js
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [empleados, setEmpleados] = useState([]); // Estado para los empleados
    const [solicitudes, setSolicitudes] = useState([]); 
    return (
        <AppContext.Provider value={{ empleados, setEmpleados, solicitudes, setSolicitudes }}>
            {children}
        </AppContext.Provider>
    );
};
