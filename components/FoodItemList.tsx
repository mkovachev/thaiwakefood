import React, { useState } from 'react'
import { StyleSheet, Platform, Dimensions } from 'react-native'
import { FoodItemDto } from '../data/FoodItemDto'
import FoodItem from './FoodItem'
import { CategoryItem } from '../data/CategoryItem'
import { View } from '../ui/Themed'

interface Props {
  items: FoodItemDto[]
  category: CategoryItem | null
}

const { width } = Dimensions.get('window')

export default function FoodItemList({ items, category }: Props) {
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItemDto>(items[0])

  return (
    <View style={styles.container}>
      {items
        .filter((item: FoodItemDto) => {
          if (category === null) return true
          return item.category === category?.title
        })
        .map((item) => (
          <FoodItem key={item.id} item={item} />
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    marginHorizontal: Platform.OS === 'web' ? 10 : 5,
  }
})

{/* <FoodItemDetails foodItem={selectedFoodItem} visible={false} /> */ }