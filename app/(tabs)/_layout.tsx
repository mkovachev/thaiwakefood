import { Feather, MaterialIcons, Octicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { useColorScheme } from 'react-native'
import colors from '../../ui/colors'


export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'home',
          headerShown: false,
          tabBarIcon: ({ color }) => <Octicons name="home" size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          headerShown: true,
          tabBarIcon: ({ color }) => <Feather size={24} name="heart" color={color} />
        }}
      />
      <Tabs.Screen
        name="my-orders"
        options={{
          title: 'My Orders',
          headerShown: true,
          tabBarIcon: ({ color }) => <MaterialIcons size={24} name="view-list" color={color} />
        }}
      />
      <Tabs.Screen
        name="shopping-cart"
        options={{
          title: 'Shopping Cart',
          headerShown: true,
          tabBarIcon: ({ color }) => <Feather size={24} name="shopping-bag" color={color} />
        }}
      />
    </Tabs>
  )
}
