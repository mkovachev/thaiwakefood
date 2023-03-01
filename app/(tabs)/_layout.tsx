import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router'
import { useColorScheme } from 'react-native'
import colors from '../../constants/colors'

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
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => <Feather size={24} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => <Feather size={24} name="heart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="shoppingCart"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => <Feather size={24} name="shopping-cart" color={color} />,
        }}
      />
    </Tabs>
  );
}
