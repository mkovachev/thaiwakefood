import React, { } from 'react'
import { StyleSheet, FlatList, Platform, Dimensions, useWindowDimensions } from 'react-native'
import { FoodItemDto } from '../data/FoodItemDto'
import { CategoryItem } from '../data/CategoryItem'
import FoodItemCard from './FoodItemView'

interface Props {
  data: FoodItemDto[]
  category?: CategoryItem | null
  handleShowDetails?: (item: FoodItemDto) => void
}

const MenuGrid = ({ data, category }: Props) => {
  const { width } = useWindowDimensions();
  const mobileColumns = Math.floor(width / 150)
  const webColumns = Math.floor(window.innerWidth / 400);

  const filteredMenu = category ? data.filter(item => item.category === category.title) : data

  return (
    <FlatList
      data={filteredMenu}
      numColumns={Platform.OS === 'web' ? webColumns : mobileColumns}
      renderItem={({ item }) => (<FoodItemCard item={item} />)}
      keyExtractor={(item) => item.id}
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
