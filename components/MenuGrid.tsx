import React, { } from 'react'
import { StyleSheet, FlatList, Platform, Dimensions } from 'react-native'
import { FoodItemDto } from '../data/FoodItemDto'
import { CategoryItem } from '../data/CategoryItem'
import FoodItemCard from './FoodItemCard'

interface Props {
  data: FoodItemDto[]
  category?: CategoryItem | null
  handleShowDetails?: (item: FoodItemDto) => void
}

const MenuGrid = ({ data, category }: Props) => {

  const filteredMenu = category ? data.filter(item => item.category === category.title) : data

  const { width } = Dimensions.get('window')

  // calculate number of columns dynamically based on screen width
  const numColumns = Math.floor(width / 150)

  return (
    <FlatList
      data={filteredMenu}
      numColumns={numColumns}
      renderItem={({ item }) => (<FoodItemCard item={item} />)}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'web' ? 100 : 20, // added padding bottom for web
  },
})

export default MenuGrid
