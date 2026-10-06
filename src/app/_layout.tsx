
import { useColorScheme } from '@/presentation/theme/hooks/use-color-scheme';
import { useTheme } from '@/presentation/theme/hooks/use-theme';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { useColorScheme } from 'react-native';

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';


SplashScreen.preventAutoHideAsync();

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

export default function TabLayout() {


  const backgroundColor = useTheme().background
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    'Kanit-Bold': require('./../../assets/fonts/Kanit-Bold.ttf'),
    'Kanit-Regular': require('./../../assets/fonts/Kanit-Regular.ttf'),
    'Kanit-Thin': require('./../../assets/fonts/Kanit-Thin.ttf'),
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
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: backgroundColor
      }}
    >

      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

          <Stack
            screenOptions={{
              headerShown: false
            }}
          />

        </ThemeProvider>
      </QueryClientProvider>

    </GestureHandlerRootView>
  );
}
