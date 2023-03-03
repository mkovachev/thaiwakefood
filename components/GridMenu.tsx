import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Image, FlatList, LayoutChangeEvent, Dimensions, Platform } from 'react-native'
import { FoodItemDto } from '../data/FoodItemDto'
import { CategoryItem } from '../data/CategoryItem'
import { View, Text } from '../ui/Themed'
import FoodItem from './FoodItem'

interface Props {
  items: FoodItemDto[]
  category?: CategoryItem | null
}

const GRID_ITEM_WIDTH = 160
const GRID_ITEM_MARGIN = 10
const numColumns = Math.floor((Dimensions.get('window').width - GRID_ITEM_MARGIN * 2) / (GRID_ITEM_WIDTH + GRID_ITEM_MARGIN * 2))

const renderItem = ({ item }: { item: FoodItemDto }) => (
  <FoodItem item={item} />
)

const keyExtractor = (item: FoodItemDto) => item.id.toString()

const GridMenu = ({ items, category }: Props) => {

  const filteredMenu = category
    ? items.filter(item => item.category === category.title)
    : items


  return (
    <View style={styles.container}>
      <FlatList
        data={filteredMenu}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={numColumns}
        contentContainerStyle={styles.container}
        getItemLayout={(data, index) => ({
          length: Platform.OS === 'web' ? numColumns / 6 : 100,
          offset: Platform.OS === 'web' ? (numColumns / 6 + 10) * index : (100 + 10) * index,
          index,
        })}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: GRID_ITEM_MARGIN,
    paddingBottom: GRID_ITEM_MARGIN,
  }
})

export default GridMenu
