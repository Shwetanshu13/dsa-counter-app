import { create } from 'zustand';
import { config } from '../conf';

const useCounterStore = create((set, get) => ({
    counter: 0,
    records: [],
    isLoading: false,

    // Get current counter for user
    getCurrentCounter: async (userId) => {
        try {
            set({ isLoading: true });
            const response = await fetch(`${config.apiUrl}/counter/${userId}`);
            const data = await response.json();

            if (response.ok) {
                set({ counter: data[0]?.count || 0 });
                return { success: true };
            } else {
                console.error('Error fetching counter:', data.message);
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Error fetching counter:', error);
            return { success: false, message: 'Network error occurred' };
        } finally {
            set({ isLoading: false });
        }
    },

    // Increment counter for user
    incrementCounter: async (userId) => {
        try {
            set({ isLoading: true });
            const response = await fetch(`${config.apiUrl}/counter/increment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });

            if (response.ok) {
                // Optimistically update the counter
                set((state) => ({ counter: state.counter + 1 }));
                return { success: true };
            } else {
                const data = await response.json();
                console.error('Error incrementing counter:', data.message);
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Error incrementing counter:', error);
            return { success: false, message: 'Network error occurred' };
        } finally {
            set({ isLoading: false });
        }
    },

    // Get daily count records for user
    getDailyRecords: async (userId) => {
        try {
            set({ isLoading: true });
            const response = await fetch(`${config.apiUrl}/counter/${userId}/records`);
            const data = await response.json();

            if (response.ok) {
                set({ records: data });
                return { success: true };
            } else {
                console.error('Error fetching records:', data.message);
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Error fetching records:', error);
            return { success: false, message: 'Network error occurred' };
        } finally {
            set({ isLoading: false });
        }
    },

    // Reset counter (for local state only)
    resetCounter: () => set({ counter: 0 }),
}));

export default useCounterStore;
