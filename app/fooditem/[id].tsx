import FoodItemDetails from '../../components/FoodItemDetails'
import { View } from '../../ui/Themed'
import { useSearchParams } from "expo-router"
import { useEffect } from 'react'
import { FoodItemDto } from '../../data/FoodItemDto'
import NotFoundScreen from '../[...missing]'
import { StyleSheet } from 'react-native'
import { useMenu } from '../../context/menu'


const FoodItem = () => {
  const { id } = useSearchParams()

  console.log(id)

  useEffect(() => {
    if (!id) return
  }, [id])

  const data = useMenu()
  const item = data.items.find((item: FoodItemDto) => item.id === id)

  console.log(item)


  if (!item) return <NotFoundScreen />

  return (
    <View>
      <FoodItemDetails item={item} />
    </View>
  )
}

export default FoodItem

const styles = StyleSheet.create({})