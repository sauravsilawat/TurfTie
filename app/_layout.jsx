import React, { useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const RootLayout = () => {
  useEffect(() => {
    const prepare = async () => {
      try {

      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}

export default RootLayout;
