import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import React, { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { Provider as PaperProvider } from 'react-native-paper'
import { RecoilRoot } from "recoil"
import { ToastProvider } from 'react-native-toast-notifications'


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}


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

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PaperProvider>
        <RecoilRoot>
          <ToastProvider placement='top'>
            <Stack>
              <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
              <Stack.Screen name='menu/[id]' options={{ headerShown: false, presentation: 'modal' }} />
              <Stack.Screen name='my-orders/[id]' options={{ headerShown: false, presentation: 'modal' }} />
            </Stack>
          </ToastProvider>
        </RecoilRoot>
      </PaperProvider>
    </ThemeProvider>
  )
}
