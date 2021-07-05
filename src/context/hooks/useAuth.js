import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import history from '../../routes/history';
import { useHistory } from 'react-router-dom';

export default function useAuth() {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState();
    const [token, setToken] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setIsLogged(true);
        }
        setLoading(false);
    }, [])

    const handleLogin = async ({ username, email, password }) => {
        let response = null;

        try {
            const { data } = await api.post('rest-auth/login/', {
                username: username,
                email: email,
                password: password,
            })

            localStorage.setItem('token', data.key);
            
            api.defaults.headers.Authorization = `Token ${data.key}`

            setIsLogged(true);
        } catch (error) {
            response = error.response;
        }

        return response;
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLogged(false);
    }

    return { user, loading, token, isLogged, handleLogin, handleLogout };
}