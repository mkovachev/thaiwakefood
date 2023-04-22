import { View } from '../../ui/components/Themed'
import { Stack, useSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { MenuItem } from '../../data/MenuItem'
import NotFoundScreen from '../[...missing]'
import { MenuItemDetailsView } from '../../components/MenuItemDetailsView'
import { menuAtom } from '../../context/recoil'
import { useRecoilValueLoadable } from 'recoil'
import { StyleSheet } from 'react-native'

const MenuItemDetailsScreen = () => {
  const { id } = useSearchParams()
  const [item, setItem] = useState<MenuItem>()
  const menu = useRecoilValueLoadable(menuAtom)

  useEffect(() => {
    if (menu.state === 'hasValue') {
      const foundItem = menu.contents.find(item => item.id === id)
      if (foundItem) {
        setItem(foundItem)
      }
    }
  }, [id, menu, item])

  if (menu.state === 'loading') {
    return <View>Loading...</View>
  }

  if (!item) {
    return <NotFoundScreen />
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: item.name,
          presentation: 'modal',
          headerShown: true,
        }}
      />
      <View>
        <MenuItemDetailsView item={item} />
      </View>
    </View>
  )
}

export default MenuItemDetailsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
