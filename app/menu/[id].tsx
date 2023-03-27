import { View } from '../../ui/components/Themed'
import { Stack, useSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { MenuItem } from '../../data/MenuItem'
import NotFoundScreen from '../[...missing]'
import { ItemDetailsView } from '../../components/ItemDetailsView'
import { menuAtom } from '../../context/recoil'
import { useRecoilValueLoadable } from 'recoil'

const MenuItemDetailsScreen = () => {
  const { id } = useSearchParams()
  const [item, setItem] = useState<MenuItem>()
  const menu = useRecoilValueLoadable(menuAtom)

  useEffect(() => {
    if (menu.state === 'hasValue') {
      const foundItem = menu.contents.find((menuItem: MenuItem) => menuItem.id === id)
      if (foundItem) {
        setItem(foundItem)
      }
    }
  }, [id, menu])

  if (menu.state === 'loading') {
    return <View>Loading...</View>
  }

  if (!item) {
    return <NotFoundScreen />
  }

  return (
    <View>
      <Stack.Screen
        options={{
          title: item.title,
          presentation: 'modal',
          headerShown: true,
        }}
      />
      <View>
        <ItemDetailsView item={item} />
      </View>
    </View>
  )
}

export default MenuItemDetailsScreen
