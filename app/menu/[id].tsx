import { View } from '../../ui/components/Themed'
import { Stack, useSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { MenuItem } from '../../data/MenuItem'
import NotFoundScreen from '../[...missing]'
import { ItemDetailsView } from '../../components/ItemDetailsView'
import { menu } from '../../context/mmkv'


const FoodItem = () => {
  const { id } = useSearchParams()
  const { operations: store } = menu
  const [item, setItem] = useState<MenuItem | null>(null)

  useEffect(() => {
    try {
      const item = store.getById(id)
      setItem(item as MenuItem)
    } catch (error) {
      console.error(error)
    }
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
        <ItemDetailsView item={item} />
      </View>
    </View>
  )
}

// keep to parse route correctly!
export default FoodItem
