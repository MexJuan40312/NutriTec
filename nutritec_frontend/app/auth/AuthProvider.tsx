"use client";

import React, { useState, useEffect } from 'react';
import { AuthContext } from './authContext';

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setTokenState] = useState<string | null>(null);
    const [user, setUserState] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const setToken = (newToken: string | null) => {
        setTokenState(newToken);
        if (newToken) {
            localStorage.setItem('authToken', newToken);
            try {
                const decodedUser = JSON.parse(atob(newToken.split('.')[1]));
                setUserState(decodedUser);
            } catch (error) {
                console.error("Error al decodificar el token:", error);
            }
        } else {
            localStorage.removeItem('authToken');
            setUserState(null);
        }
    };

    const setUser = (newUser: any | null) => {
        setUserState(newUser);
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setTokenState(storedToken);
            try {
                const decodedUser = JSON.parse(atob(storedToken.split('.')[1]));
                setUserState(decodedUser);
            } catch (error) {
                console.error("Error al decodificar el token:", error);
            }
        }
        setIsLoading(false); // <- IMPORTANTE: después de cargar
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser, isLoading, setIsLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
