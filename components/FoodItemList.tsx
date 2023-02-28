import React from 'react'
import { FlatList, StyleSheet, Image } from 'react-native'
import { Text, View } from './Themed'
import { FoodItem } from '../data/FoodItem'
import colors from "../constants/colors"

interface FoodItemListProps {
  foodItems: FoodItem[]
}

export default function FoodItemList({ foodItems }: FoodItemListProps) {

  const renderFoodItem = ({ item }: { item: FoodItem }) => (
    <View>
      <Image style={styles.foodItemImage} source={{ uri: item.image }} />
      <Text style={styles.foodItemTitle}>{item.title}</Text>
    </View>
  )

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.foodItemList}>
          <FlatList
            data={foodItems}
            renderItem={renderFoodItem}
            keyExtractor={(item: FoodItem) => item.id.toString()}
            horizontal={true}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  foodItemList: {
    paddingHorizontal: 5
  },
  categoryItem: {
    backgroundColor: colors.white,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
  },
  foodItemImage: {
    width: 150,
    height: 150,
  },
  foodItemTitle: {
    fontFamily: 'MontserratMedium',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  }
})


