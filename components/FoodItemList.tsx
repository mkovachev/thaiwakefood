import React, { useState } from 'react'
import { FlatList, StyleSheet, Image, Pressable } from 'react-native'
import { Text, View } from './Themed'
import { FoodItem } from '../data/FoodItem'
import colors from "../constants/colors"
import FoodItemDetails from './FoodItemDetails'

interface FoodItemListProps {
  foodItems: FoodItem[]
}

export default function FoodItemList({ foodItems }: FoodItemListProps) {
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItem>(foodItems[0])
  const [isModalVisible, setModalVisible] = useState(false)

  const renderFoodItem = ({ item }: { item: FoodItem }) => (
    <Pressable
      style={[styles.pressable]}
      onPress={() => { setSelectedFoodItem(item), setModalVisible(true) }}>
      <View style={styles.foodItem}>
        <Image style={styles.foodItemImage} source={{ uri: item.image }} />
        <Text style={styles.foodItemTitle}>{item.title}</Text>
        <Text style={styles.foodItemTitle}>{item.description}</Text>
      </View>
    </Pressable>
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
          <FoodItemDetails foodItem={selectedFoodItem} visible={isModalVisible} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 20
  },

  foodItem: {
    padding: 10,
    borderRadius: 15,
    border: `1px solid ${colors.grey}`,
    backgroundColor: 'transparent',
    shadowColor: colors.black,
  },
  pressable: {
    borderRadius: 15,
    padding: 10,
    elevation: 2,
  },
  foodItemList: {
    paddingHorizontal: 5
  },
  foodItemImage: {
    width: 150,
    height: 150,
    borderRadius: 15,
  },
  foodItemTitle: {
    fontFamily: 'MontserratMedium',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  }
})
