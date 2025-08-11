import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreenLib from 'expo-splash-screen';
import 'react-native-gesture-handler';

import MainNavigator from './navigation/MainNavigator';
import SplashScreen from './components/SplashScreen';
import useAuthStore from './store/authStore';

// Prevent the splash screen from auto-hiding
SplashScreenLib.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { initializeAuth, isLoading } = useAuthStore();

  useEffect(() => {
    async function prepare() {
      try {
        // Initialize auth state from secure storage
        await initializeAuth();
      } catch (e) {
        console.warn('Error initializing app:', e);
      } finally {
        setAppIsReady(true);
        // Hide the splash screen
        SplashScreenLib.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady || isLoading) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaProvider>
      <MainNavigator />
    </SafeAreaProvider>
  );
}
