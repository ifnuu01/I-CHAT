import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from "react";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface AuthError {
    email?: string;
    password?: string;
    name?: string;
    message?: string;
    password_confirmation?: string;
}

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AuthError | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            const storedUser = await AsyncStorage.getItem('user');
            
            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
        }
    };

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            
            const result = await response.json();

            if (!response.ok) {
                if (result.errors) {
                    setError(result.errors);
                    return;
                }
                setError({ message: result.message || "Login failed" });
                return;
            }

            const { data } = result;
            await AsyncStorage.setItem('token', data.token);
            await AsyncStorage.setItem('user', JSON.stringify({
                id: data.id,
                name: data.name,
                email: data.email,
                role: data.role
            }));

            setToken(data.token);
            setUser({
                id: data.id,
                name: data.name,
                email: data.email,
                role: data.role
            });

            console.log("Login successful:", result);
            
            router.replace('/(tabs)/conversations');
            
        } catch (err) {
            console.log("Login error:", err);
        } finally {
            setLoading(false);
        }
    };

    const registrasi = async (name: string, email: string, password: string, password_confirmation:string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ name, email, password, password_confirmation }),
            });

            const result = await response.json();

            if (!response.ok) {
                if (result.errors) {
                    setError(result.errors);
                    return;
                }
                setError({ message: result.message || "Registration failed" });
                return;
            }

            const { data } = result;
            await AsyncStorage.setItem('token', data.token);
            await AsyncStorage.setItem('user', JSON.stringify({
                id: data.id,
                name: data.name,
                email: data.email,
                role: data.role
            }));

            setToken(data.token);
            setUser({
                id: data.id,
                name: data.name,
                email: data.email,
                role: data.role
            });

            console.log("Registration successful:", result);
            router.replace('/(tabs)/conversations');
        } catch (err) {
            console.log("Registration error:", err);
        } finally {
            setLoading(false);
        }
    }
    
    const logout = async () => {
        setLoading(true);
        setError(null);
        
        try {
            if (token) {
                await fetch(`${API_URL}/auth/logout`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
            }
        
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
            
            setToken(null);
            setUser(null);
            
            router.replace('/login');
            
        } catch (error) {
            setError({ message: "Logout failed" });
            console.error("Logout error:", error);
        } finally {
            setLoading(false);
        }
    };
    
    return {
        loading,
        error,
        user,
        token,
        login,
        logout,
        registrasi,
        isAuthenticated: !!token
    };
};