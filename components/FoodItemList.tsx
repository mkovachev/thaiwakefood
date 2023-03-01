import React, { useState } from 'react'
import { FlatList, StyleSheet, Image, Pressable, TouchableOpacity, Platform } from 'react-native'
import { Text, View } from './Themed'
import { FoodItem } from '../data/FoodItem'
import colors from "../constants/colors"
import FoodItemDetails from './FoodItemDetails'
import { BlurView } from 'expo-blur'

interface Props {
  foodItems: FoodItem[]
}

export default function FoodItemList({ foodItems }: Props) {
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItem>(foodItems[0])
  const [modalVisible, setModalVisible] = useState(false)

  const renderFoodItem = ({ item }: { item: FoodItem }) => (
    <BlurView
      tint="default"
      intensity={80}
    >
      <TouchableOpacity
        style={[styles.touchable]}
        onPress={() => { setSelectedFoodItem(item), setModalVisible(true) }}>
        <View style={styles.foodItem}>
          <Image style={styles.image} source={{ uri: item.image }} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    </BlurView>
  )

  return (
    <View>
      <View style={styles.container}>
        <FlatList
          data={foodItems}
          renderItem={renderFoodItem}
          keyExtractor={(item: FoodItem) => item.id.toString()}
          numColumns={2}
        />
      </View>
      {modalVisible &&
        <View>
          <FoodItemDetails foodItem={selectedFoodItem} visible={modalVisible} />
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 20,
  },
  touchable: {
    height: 200,
    width: 220,
  },
  foodItem: {
    flex: 1,
    border: `1px solid ${colors.black}`,
    borderRadius: 15
  },
  image: {
    width: '70%',
    height: '60%',
    borderRadius: 15,
  },
  title: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 12,
    marginHorizontal: 5
  },
  description: {
    fontFamily: 'MontserratMedium',
    fontSize: 10,
    marginHorizontal: 5
  },
})
