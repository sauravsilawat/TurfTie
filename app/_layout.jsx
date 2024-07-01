import React, { useEffect } from 'react';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthContextProvider, useAuth } from '../AuthContext';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('(tabs)');
    } else if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Any asynchronous preparation code can go here
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthContextProvider>
        <AppContent />
      </AuthContextProvider>
    </GestureHandlerRootView>
  );
}

export default RootLayout;
