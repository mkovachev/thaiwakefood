import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Tabs } from 'expo-router'
import { ComponentProps } from 'react'
import { useColorScheme } from 'react-native'
import colors from '../../constants/colors'


function TabBarIcon(props: {
  name: ComponentProps<typeof FontAwesome>['name']
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -10 }} {...props} />
}

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
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'favorites',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="heart-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="shoppingCart"
        options={{
          title: 'Shopping cart',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="shopping-cart" color={color} />,
        }}
      />
    </Tabs>
  );
}
