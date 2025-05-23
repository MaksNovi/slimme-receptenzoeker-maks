import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the interface for context
export interface AuthContextType {
    currentUser: { username: string } | null;
    isAuthenticated: boolean;
    login: (userData: { username: string; accessToken: string }) => void;
    logout: () => void;
    setToken: (token: string | null) => void;
    setCurrentUser: (user: { username: string } | null) => void;
}

// Default value for the context
const defaultAuthContext: AuthContextType = {
    currentUser: null,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    setToken: () => {},
    setCurrentUser: () => {},
};

//  Create the context
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<{ username: string } | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Load from localStorage on mount
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        if (storedUser) setCurrentUser(JSON.parse(storedUser));
        if (storedToken) setToken(storedToken);
    }, []);

    // Function to handle login
    const login = (userData: { username: string; accessToken: string }) => {
        setCurrentUser({ username: userData.username });
        setToken(userData.accessToken);
        localStorage.setItem("user", JSON.stringify({ username: userData.username }));
        localStorage.setItem("token", userData.accessToken);
    };

    // Function to handle logout
    const logout = () => {
        setCurrentUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                isAuthenticated: !!currentUser,
                login,
                logout,
                setToken,
                setCurrentUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};