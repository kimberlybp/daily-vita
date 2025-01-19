import store from "@/store"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from 'expo-splash-screen'
import React, { useEffect } from "react"
import { PaperProvider } from 'react-native-paper'
import { Provider } from "react-redux"

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Poppins Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <PaperProvider >
        <Stack
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(survey)" />
        </Stack>
      </PaperProvider>
    </Provider>
  )
}
