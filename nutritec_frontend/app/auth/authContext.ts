import { createContext, useContext } from 'react';

interface AuthContextType {
    token: string | null;
    setToken: (newToken: string | null) => void;
    user: any | null;
    setUser: (newUser: any | null) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
    token: null,
    setToken: () => {},
    user: null,
    setUser: () => {},
    isLoading: true,
    setIsLoading: () => {},
});

export const useAuth = () => useContext(AuthContext);
