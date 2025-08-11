import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { config } from '../conf';

const useAuthStore = create((set, get) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,

    // Initialize auth state from secure storage
    initializeAuth: async () => {
        try {
            set({ isLoading: true });
            const userData = await SecureStore.getItemAsync('user');
            if (userData) {
                const user = JSON.parse(userData);
                set({ user, isAuthenticated: true });
            }
        } catch (error) {
            console.error('Error initializing auth:', error);
        } finally {
            set({ isLoading: false });
        }
    },

    // Register new user
    register: async (name, email, password) => {
        try {
            set({ isLoading: true });
            const response = await fetch(`${config.apiUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                return { success: true, message: data.message };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, message: 'Network error occurred' };
        } finally {
            set({ isLoading: false });
        }
    },

    // Login user
    login: async (email, password) => {
        try {
            set({ isLoading: true });
            const response = await fetch(`${config.apiUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                const user = data.user;
                await SecureStore.setItemAsync('user', JSON.stringify(user));
                set({ user, isAuthenticated: true });
                return { success: true, message: data.message };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Network error occurred' };
        } finally {
            set({ isLoading: false });
        }
    },

    // Logout user
    logout: async () => {
        try {
            await SecureStore.deleteItemAsync('user');
            set({ user: null, isAuthenticated: false });
        } catch (error) {
            console.error('Logout error:', error);
        }
    },
}));

export default useAuthStore;
