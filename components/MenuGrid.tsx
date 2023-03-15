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
  const { width } = Dimensions.get('window')
  const columns = Math.floor(width / 150)

  const filteredMenu = category ? data.filter(item => item.category === category.title) : data

  return (
    <FlatList
      data={filteredMenu}
      numColumns={columns}
      renderItem={({ item }) => (<FoodItemCard item={item} />)}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={[styles.container, Platform.OS === 'web' && styles.webContainer]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'web' ? 100 : 20,
  },
  webContainer: {
    overflow: 'scroll'
  }
})

export default MenuGrid
