import React, { useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import useAuthStore from '../../store/authStore';
import useCounterStore from '../../store/counterStore';

const CounterScreen = () => {
    const { user, logout } = useAuthStore();
    const { counter, incrementCounter, getCurrentCounter, isLoading } = useCounterStore();

    useFocusEffect(
        React.useCallback(() => {
            if (user?.id) {
                getCurrentCounter(user.id);
            }
        }, [user?.id])
    );

    const handleIncrement = async () => {
        if (!user?.id) return;

        const result = await incrementCounter(user.id);
        if (!result.success) {
            Alert.alert('Error', result.message || 'Failed to increment counter');
        }
    };

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Logout', style: 'destructive', onPress: logout },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Welcome, {user?.name || user?.email}!</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>

            {/* Counter Section */}
            <View style={styles.content}>
                <Text style={styles.label}>Today's DSA Problems Solved</Text>

                <View style={styles.counterContainer}>
                    <Text style={styles.counterText}>{counter}</Text>
                </View>

                <TouchableOpacity
                    style={[styles.incrementButton, isLoading && styles.buttonDisabled]}
                    onPress={handleIncrement}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#FFFFFF" size="large" />
                    ) : (
                        <Text style={styles.incrementButtonText}>+1</Text>
                    )}
                </TouchableOpacity>

                <Text style={styles.motivationText}>
                    Keep going! Every problem solved is progress! 🚀
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E7',
    },
    welcomeText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1D1D1F',
        flex: 1,
    },
    logoutButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: '#FF3B30',
    },
    logoutButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1D1D1F',
        textAlign: 'center',
        marginBottom: 32,
    },
    counterContainer: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 48,
        shadowColor: '#007AFF',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 12,
    },
    counterText: {
        fontSize: 64,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    incrementButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#34C759',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
        shadowColor: '#34C759',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    buttonDisabled: {
        backgroundColor: '#A1A1A6',
    },
    incrementButtonText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    motivationText: {
        fontSize: 16,
        color: '#6C6C70',
        textAlign: 'center',
        fontStyle: 'italic',
    },
});

export default CounterScreen;
