import React from 'react';
import { FlatList, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Text, View } from './Themed';
import { useGetFoodItemList } from '../hooks/getFoodItemList';
import { FoodItem } from '../data/FoodItem';


export default function FoodItemList({ path }: { path: string }) {
  const { data: foodItems, isLoading: isLoadingFoodItems } = useGetFoodItemList()

  if (!foodItems || isLoadingFoodItems) {
    return null
  }

  const renderFoodItem = ({ item }: { item: FoodItem }) => (
    <View>
      <Image style={styles.foodItemImage} source={item.image as ImageSourcePropType} />
      <Text>{item.title}</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 10,
    fontFamily: 'MontserratBold',
    fontSize: 16,
    paddingHorizontal: 20
  },
  foodItemList: {

  },
  foodItemImage: {

  },
});


