import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

const root = ReactDOM.createRoot(document.getElementById('root')); // Usa createRoot

root.render(
    <AuthProvider>
        <AppProvider>
        <App />
        </AppProvider>
    </AuthProvider>
);

reportWebVitals();
