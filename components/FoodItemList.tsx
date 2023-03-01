import React, { useState } from 'react'
import { StyleSheet, Platform, SafeAreaView, ScrollView } from 'react-native'
import { View } from './Themed'
import { FoodItemDto } from '../data/FoodItemDto'
import FoodItemDetails from './FoodItemDetails'
import FoodItem from './FoodItem'

interface Props {
  foodItems: FoodItemDto[]
}

export default function FoodItemList({ foodItems }: Props) {
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItemDto>(foodItems[0])
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <SafeAreaView>
      <ScrollView style={{ padding: 10 }}>
        <View>
          <View style={styles.container}>
            {foodItems.map((foodItem) => (
              <FoodItem key={foodItem.id} foodItem={foodItem} />
            ))}
          </View>
          {modalVisible &&
            <View>
              <FoodItemDetails foodItem={selectedFoodItem} visible={modalVisible} />
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
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 20,
  },
})
