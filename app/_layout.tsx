import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import React, { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Feather, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Provider as PaperProvider } from 'react-native-paper'
import { ToastProvider } from 'react-native-toast-notifications'
import colors from '../ui/colors'


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
    <ToastProvider
      placement='top'
      duration={5000}
      animationType='zoom-in'
      animationDuration={250}
      successColor={colors.green}
      dangerColor={colors.red}
      warningColor={colors.orange}
      normalColor={colors.white}
      successIcon={<Feather name="check-circle" size={24} color={colors.white} />}
      dangerIcon={<MaterialIcons name="dangerous" size={24} color={colors.white} />}
      warningIcon={<Ionicons name="warning-outline" size={24} color={colors.white} />}
      textStyle={{ fontSize: 20 }}
      offset={50}
      offsetTop={30}
      offsetBottom={40}
      swipeEnabled={true}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <PaperProvider>
            <Stack>
              <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
              <Stack.Screen name='menu/[id]' options={{ headerShown: false, presentation: 'containedModal' }} />
            </Stack>
          </PaperProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ToastProvider>
  )
}
