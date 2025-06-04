import {createContext, useContext, useEffect, useState} from "react";
import PropTypes from 'prop-types';

// Default value for the context
const defaultAuthContext = {
    currentUser: null,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    setToken: () => {},
    setCurrentUser: () => {},
};

// Create the context
const AuthContext = createContext(defaultAuthContext);

// Provider component
export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Load from localStorage on mount
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser) {
            try {
                setCurrentUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error parsing stored user data:', error);
                localStorage.removeItem("user");
            }
        }

        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    // Function to handle login
    const login = (userData) => {
        const user = {username: userData.username};
        setCurrentUser(user);
        setToken(userData.accessToken);

        // Store in localStorage for persistence
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", userData.accessToken);
    };

    // Function to handle logout
    const logout = () => {
        setCurrentUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    // Function to manually set token (useful for token refresh)
    const handleSetToken = (newToken) => {
        setToken(newToken);
        if (newToken) {
            localStorage.setItem("token", newToken);
        } else {
            localStorage.removeItem("token");
        }
    };

    // Function to manually set the current user
    const handleSetCurrentUser = (user) => {
        setCurrentUser(user);
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                isAuthenticated: !!currentUser && !!token,
                login,
                logout,
                setToken: handleSetToken,
                setCurrentUser: handleSetCurrentUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// PropTypes for validation
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

// Custom hook to use auth context
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};
