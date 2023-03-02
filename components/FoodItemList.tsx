import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, FlatList, Platform, Dimensions } from 'react-native'
import { FoodItemDto } from '../data/FoodItemDto'
import FoodItem from './FoodItem'
import { CategoryItem } from '../data/CategoryItem'
import colors from '../ui/colors'
import sizes from '../ui/sizes'
import { View } from '../ui/Themed'

interface Props {
  foodItems: FoodItemDto[]
  category: CategoryItem | null
}

const { width } = Dimensions.get('window')
const columnWidth = width / 4

export default function FoodItemList({ foodItems, category }: Props) {
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItemDto>(foodItems[0])

  // filter per category
  const data = foodItems.filter((item: FoodItemDto) => {
    if (category === null) return true
    return item.category === category?.title
  })

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView style={{ padding: 10 }}>
        <View style={styles.container}>
            {foodItems.filter((item: FoodItemDto) => {
              if (category === null) return true
              return item.category === category?.title
            })
              .map((foodItem) => (
                <FoodItem key={foodItem.id} foodItem={foodItem} />
              ))}
          </View>
      </ScrollView> */}
      <View style={styles.view}>
        <FlatList
          data={data}
          numColumns={Platform.OS === 'web' ? 4 : 2}
          renderItem={({ item }) => <FoodItem foodItem={item} />}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "space-between",
    gap: sizes.px10,
    marginHorizontal: sizes.px10,
    marginVertical: sizes.px20,
  },
  view: {
    flex: 1
  }
})

{/* <FoodItemDetails foodItem={selectedFoodItem} visible={false} /> */ }