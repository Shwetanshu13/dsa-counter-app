import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import CounterScreen from '../screens/counter/CounterScreen';
import RecordsScreen from '../screens/records/RecordsScreen';
import useAuthStore from '../store/authStore';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
);

const AppNavigator = () => (
    <Tab.Navigator
        screenOptions={{
            headerShown: true,
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: '#8E8E93',
        }}
    >
        <Tab.Screen
            name="Counter"
            component={CounterScreen}
            options={{
                title: 'DSA Counter',
                tabBarLabel: 'Counter',
            }}
        />
        <Tab.Screen
            name="Records"
            component={RecordsScreen}
            options={{
                title: 'Daily Records',
                tabBarLabel: 'Records',
            }}
        />
    </Tab.Navigator>
);

const MainNavigator = () => {
    const { isAuthenticated } = useAuthStore();

    return (
        <NavigationContainer>
            {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
};

export default MainNavigator;
