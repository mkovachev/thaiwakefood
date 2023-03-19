import { View } from '../../ui/components/Themed'
import { Stack, useSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { FoodItemDto } from '../../data/FoodItemDto'
import NotFoundScreen from '../[...missing]'
import useStorage from '../../context/storage'
import storageKeys from '../../constants/storageKeys'
import { MenuItemView } from '../../components/MenuItemView'


const FoodItem = () => {
  const { id } = useSearchParams()
  const { getItem } = useStorage<FoodItemDto>(storageKeys.menu)
  const [item, setItem] = useState<FoodItemDto | null>(null)

  useEffect(() => {
    const getItemById = async () => {
      const item = await getItem(id) || null
      setItem(item)
    }
    if (id) getItemById()
  }, [id])

  if (!item) return <NotFoundScreen />

  return (
    <View>
      <Stack.Screen
        options={{
          title: item.title,
          presentation: 'modal',
          headerShown: true
        }}
      />
      <View>
        <MenuItemView item={item} />
      </View>
    </View>
  )
}

// keep to parse route correctly
export default FoodItem
