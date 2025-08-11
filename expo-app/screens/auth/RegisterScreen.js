import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import useAuthStore from '../../store/authStore';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { register, isLoading } = useAuthStore();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleRegister = async () => {
        if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (!validateEmail(email.trim())) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters long');
            return;
        }

        const result = await register(name.trim(), email.trim(), password);
        if (result.success) {
            Alert.alert(
                'Success',
                'Account created successfully! Please login.',
                [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
            );
        } else {
            Alert.alert('Registration Failed', result.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.content}>
                        <Text style={styles.title}>Create Account</Text>
                        <Text style={styles.subtitle}>Join DSA Counter today</Text>

                        <View style={styles.form}>
                            <TextInput
                                style={styles.input}
                                placeholder="Full Name"
                                value={name}
                                onChangeText={setName}
                                autoCapitalize="words"
                                autoCorrect={false}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                autoCapitalize="none"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                                autoCapitalize="none"
                            />

                            <TouchableOpacity
                                style={[styles.button, isLoading && styles.buttonDisabled]}
                                onPress={handleRegister}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color="#FFFFFF" />
                                ) : (
                                    <Text style={styles.buttonText}>Create Account</Text>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.linkButton}
                                onPress={() => navigation.navigate('Login')}
                                disabled={isLoading}
                            >
                                <Text style={styles.linkText}>
                                    Already have an account? Login
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    content: {
        paddingHorizontal: 32,
        paddingVertical: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        color: '#1D1D1F',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 48,
        color: '#6C6C70',
    },
    form: {
        gap: 16,
    },
    input: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderRadius: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#E5E5E7',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonDisabled: {
        backgroundColor: '#A1A1A6',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    linkButton: {
        alignItems: 'center',
        marginTop: 16,
    },
    linkText: {
        color: '#007AFF',
        fontSize: 16,
    },
});

export default RegisterScreen;
