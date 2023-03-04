import { useRouter, useSegments } from "expo-router"
import React, { createContext, useContext, useEffect, useState } from "react"
import { useAsyncStorage } from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/core"

interface AuthContextProps {
  signIn: () => void
  signOut: () => void
  user: any //TODO: add UserDto
}

const AuthContext = createContext<AuthContextProps>({
  signIn: () => { },
  signOut: () => { },
  user: null,
})


export function useAuth() {
  return useContext(AuthContext)
}

function useProtectedRoute(user: any) {
  const rootSegment = useSegments()[0]
  const router = useRouter()
  const nav = useNavigation()

  useEffect(() => {
    if (user === undefined) {
      return
    }

    if (!user && rootSegment !== "(auth)") {
      router.replace("/sign-in")
    } else if (user && rootSegment !== "(app)") {
      router.replace("/")
    }
  }, [user, rootSegment])
}

export function Provider(props: any) {
  const { getItem, setItem, removeItem } = useAsyncStorage('user')
  const [user, setUser] = useState(null)

  useEffect(() => {
    getItem().then((json) => {
      if (json != null) {
        setUser(JSON.parse(json))
      } else {
        setUser(null)
      }
    })
  }, [])

  useProtectedRoute(user)

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          setUser(null)
          setItem(JSON.stringify({}))
        },
        signOut: () => {
          setUser(null)
          removeItem()
        },
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}