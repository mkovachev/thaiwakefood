import { Feather } from '@expo/vector-icons'
import { FoodItemDto } from '../data/FoodItemDto'
import { Image, StyleSheet, View, TouchableOpacity, Dimensions, Platform } from 'react-native'
import { Text } from '../ui/Themed'
import colors from '../ui/colors'
import React from 'react'
import sizes from '../ui/sizes'
import shapes from '../ui/shapes'

interface Props {
  foodItem: FoodItemDto
}

const { width } = Dimensions.get('window')

export default function FoodItem({ foodItem }: Props) {

  const showDetails = (id: number) => {
    console.log(id)
  }

  return (
    <View key={foodItem.id} style={styles.container}>
      <TouchableOpacity style={styles.touchableImage}>
        <Image source={{ uri: foodItem.image }} style={styles.image} />
      </TouchableOpacity>
      <Feather style={styles.favoriteIcon} name="heart" size={24} />
      <Text numberOfLines={1} style={styles.id}>
        # {foodItem.id}
      </Text>
      <Text numberOfLines={1} style={styles.title}>
        {foodItem.title}
      </Text>
      <Text numberOfLines={2} style={styles.description}>
        {foodItem.description}
      </Text>
      <Text style={styles.price}>
        Price from {foodItem.prices?.[0]} THB
      </Text>
      <TouchableOpacity style={styles.showMore} onPress={() => showDetails(foodItem.id)}>
        <Text style={styles.showMoreText}>
          show details
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    padding: 20,
    border: shapes.borderYellow,
    borderRadius: 20,
    overflow: "hidden",
    marginVertical: 10,
  },
  touchableImage: {
    width: (Platform.OS === 'web') ? 250 : 150,
    height: (Platform.OS === 'web') ? 200 : 150,
    overflow: "hidden",
  },
  image: {
    width: (Platform.OS === 'web') ? '90%' : '100%',
    height: (Platform.OS === 'web') ? '100%' : '90%',
  },
  id: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 20,
    position: "absolute",
    left: 10,
    overflow: "hidden",
  },
  favoriteIcon: {
    position: "absolute",
    right: 10,
    overflow: "hidden",
  },
  title: {
    fontFamily: 'MontserratSemiBold',
    fontSize: Platform.OS === 'web' ? 20 : 15,
    marginTop: 10,
    marginBottom: 5,
  },
  description: {
    fontSize: Platform.OS === 'web' ? 15 : 12,
  },
  price: {
    marginRight: 5,
    fontSize: Platform.OS === 'web' ? 15 : 12,
    marginTop: 20,
  },
  showMore: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 15,
    border: shapes.borderYellow,
  },
  showMoreText: {
    marginRight: 5,
    fontSize: Platform.OS === 'web' ? 15 : 12,
  }
})