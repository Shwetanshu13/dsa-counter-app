import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <Text style={styles.title}>DSA Counter</Text>
            <Text style={styles.subtitle}>Track your daily progress</Text>
            <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1D1D1F',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6C6C70',
        marginBottom: 48,
    },
    loader: {
        marginTop: 32,
    },
});

export default SplashScreen;
