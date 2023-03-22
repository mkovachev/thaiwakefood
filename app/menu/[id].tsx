import { View } from '../../ui/components/Themed'
import { Stack, useSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { MenuItem } from '../../data/MenuItem'
import NotFoundScreen from '../[...missing]'
import { ItemDetailsView } from '../../components/ItemDetailsView'
import { menuStorage } from '../../context/asyncStorage'


const FoodItem = () => {
  const { id } = useSearchParams()
  const { store } = menuStorage
  const [item, setItem] = useState<MenuItem | null>(null)

  useEffect(() => {
    (async () => {
      try {
        const item = await store.getItem(id)
        setItem(item)
      } catch (error) {
        console.error(error)
      }
    })()
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
