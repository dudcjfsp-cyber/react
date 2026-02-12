import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

interface User {
    username: string;
    name: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoggedIn: boolean;
    login: (token: string, username: string, name: string, role?: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'));
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!token);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // 여기서 토큰 유효성 검사 API (/auth/me) 호출하면 더 좋음
            const storedUser = localStorage.getItem('user_info');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    const login = (newToken: string, username: string, name: string, role: string = 'USER') => {
        localStorage.setItem('access_token', newToken);
        const userInfo = { username, name, role };
        localStorage.setItem('user_info', JSON.stringify(userInfo));

        setToken(newToken);
        setUser(userInfo);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_info');
        setToken(null);
        setUser(null);
        setIsLoggedIn(false);
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, token, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
