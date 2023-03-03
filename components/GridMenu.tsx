import React, { } from 'react'
import { StyleSheet, FlatList, Platform, TouchableOpacity, Dimensions } from 'react-native'
import { FoodItemDto } from '../data/FoodItemDto'
import { CategoryItem } from '../data/CategoryItem'
import FoodItem from './FoodItem'

interface Props {
  data: FoodItemDto[]
  category?: CategoryItem | null
}

const GridMenu = ({ data, category }: Props) => {

  const filteredMenu = category ? data.filter(item => item.category === category.title) : data

  const renderItem = ({ item }: { item: FoodItemDto }) => <FoodItem item={item} />
  const { width } = Dimensions.get('window')
  const numColumns = Math.floor(width / 150) // calculate number of columns dynamically based on screen width

  return (
    <FlatList
      data={filteredMenu}
      numColumns={numColumns}
      renderItem={renderItem}
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

export default GridMenu
