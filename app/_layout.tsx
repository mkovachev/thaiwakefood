import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { createContext, useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { QueryClient, QueryClientProvider } from 'react-query'
import { FontAwesome5 } from '@expo/vector-icons'
import { Provider as PaperProvider } from 'react-native-paper'
import { ToastProvider } from 'react-native-toast-notifications'
import { ShoppingCartItem } from '../data/ShoppingCartItem'
import shoppingCartStorage, { ShoppingCartStorageProps } from '../context/shoppingCartStorage'


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
})

export const ShoppingCartContext = createContext<ShoppingCartStorageProps | null>(null);

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
    MontserratMedium: require('../assets/fonts/Montserrat-Medium.ttf'),
    MontserratSemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
    MontserratBold: require('../assets/fonts/Montserrat-Bold.ttf'),
    ...FontAwesome5.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  )
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()
  const cart = shoppingCartStorage();

  return (
    <ToastProvider>
      <ShoppingCartContext.Provider value={cart}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <PaperProvider>
              <Stack>
                <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                <Stack.Screen name='menu/[id]' options={{ headerShown: false }} />
              </Stack>
            </PaperProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </ShoppingCartContext.Provider>
    </ToastProvider>
  )
}
