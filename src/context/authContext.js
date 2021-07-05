import React, { createContext } from 'react';
import useAuth from './hooks/useAuth';

const Context = createContext();

function AuthProvider({ children }) {
    const {
        user, token, loading, handleLogin, handleLogout, isLogged
    } = useAuth();

    return (
        <Context.Provider value={{ user, token, isLogged, handleLogin, handleLogout, loading }}>
            {children}
        </Context.Provider>
    )
}

export { Context, AuthProvider };