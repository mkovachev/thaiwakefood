import { Link, Stack, useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Platform, Pressable, Text } from "react-native"
import FontAwesome from "@expo/vector-icons/FontAwesome"

import { useAuth } from "../../context/auth"
import colors from '../../ui/colors'

export const unstable_settings = {
  initialRouteName: "index",
}

export default function AuthLayout() {
  const router = useRouter()

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerRight: SignOutButton,
        }}
      >
        <Stack.Screen
          name="sign in"
          options={{
            title: "sign in",
            presentation: "modal",
          }} />
        <Stack.Screen
          name="sign out"
          options={{
            title: "sign out",
            presentation: "modal",
            headerRight: Platform.select({
              ios: DismissComposeButton,
            }),
          }} />
      </Stack>
    </>
  )
}

function SignOutButton() {
  const { signOut } = useAuth()

  return (
    <Link
      href="/sign-in"
      onPress={(ev) => {
        ev.preventDefault()
        signOut()
      }}
      asChild
    >
      <Pressable
        style={{
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          paddingRight: 8,
        }}
      >
        <Text
          style={{
            fontWeight: "normal",
            paddingHorizontal: 8,
            fontSize: 16,
          }}
        >
          Sign Out
        </Text>
        <FontAwesome name='sign-out' size={24} color={colors.black} />
      </Pressable>
    </Link>
  )
}

function DismissComposeButton() {
  return (
    <Link href='..'>
      <Text
        style={{
          fontWeight: 'normal',
          paddingHorizontal: 8,
          fontSize: 16,
        }}
      >
        Back
      </Text>
    </Link>
  )
}