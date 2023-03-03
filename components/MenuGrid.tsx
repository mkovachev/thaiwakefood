import React, { } from 'react'
import { StyleSheet, FlatList, Platform, Dimensions, Linking } from 'react-native'
import { FoodItemDto } from '../data/FoodItemDto'
import { CategoryItem } from '../data/CategoryItem'
import FoodItemCard from './FoodItemCard'

interface Props {
  data: FoodItemDto[]
  category?: CategoryItem | null
  handleShowDetails: (item: FoodItemDto) => void
}

const MenuGrid = ({ data, category }: Props) => {

  const filteredMenu = category ? data.filter(item => item.category === category.title) : data

  const handleShowDetails = (item: FoodItemDto) => {
    Linking.openURL(`details://${item.id}`)
  }

  const { width } = Dimensions.get('window')
  const numColumns = Math.floor(width / 150) // calculate number of columns dynamically based on screen width

  return (
    <FlatList
      data={filteredMenu}
      numColumns={numColumns}
      renderItem={({ item }) => (
        <FoodItemCard item={item} handleShowDetails={() => handleShowDetails(item)} />
      )}
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
