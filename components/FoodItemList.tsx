import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { View } from '../ui/Themed'
import { FoodItemDto } from '../data/FoodItemDto'
import FoodItemDetails from './FoodItemDetails'
import FoodItem from './FoodItem'
import { CategoryItem } from '../data/CategoryItem'
import sizes from '../ui/sizes'

interface Props {
  foodItems: FoodItemDto[]
  category: CategoryItem | null
}

export default function FoodItemList({ foodItems, category }: Props) {
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItemDto>(foodItems[0])

  return (
    <SafeAreaView>
      <ScrollView style={{ padding: 10 }}>
        <View>
          <View style={styles.container}>
            {foodItems.filter((item: FoodItemDto) => {
              if (category === null) return true
              return item.category === category?.title
            })
              .map((foodItem) => (
                <FoodItem key={foodItem.id} foodItem={foodItem} />
              ))}
          </View>
          {false &&
            <View>
              <FoodItemDetails foodItem={selectedFoodItem} visible={false} />
            </View>
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "space-between",
    gap: sizes.px10,
    marginHorizontal: sizes.px10,
    marginVertical: sizes.px20,
  },
})
