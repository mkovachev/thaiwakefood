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

const { width } = Dimensions.get("window")

export default function FoodItem({ foodItem }: Props) {

  const showDetails = (id: number) => {

  }

  return (
    <View key={foodItem.id} style={styles.container}>
      <TouchableOpacity style={styles.touchableImage}>
        <Image source={{ uri: foodItem.image }} style={styles.image} />
        <View style={styles.favoriteIcon}>
          <Feather name="heart" size={24} />
        </View>
      </TouchableOpacity>

      <Text numberOfLines={1} style={styles.title}>
        {foodItem.title}
      </Text>
      <Text numberOfLines={2} style={styles.description}>
        {foodItem.description}
      </Text>

      <View style={styles.actions}>
        <Text style={styles.price}>
          Price from {foodItem.prices?.[0]} THB
        </Text>
        <TouchableOpacity style={styles.showMore} onPress={() => showDetails(foodItem.id)}>
          <Text style={styles.showMoreText}>
            show details
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: (Platform.OS === 'web') ? 400 : width / 2 - sizes.px20,
    justifyContent: 'space-between',
    padding: sizes.px20,
    border: shapes.borderYellow,
    borderRadius: sizes.px20,
    overflow: "hidden",
  },
  touchableImage: {
    width: (Platform.OS === 'web') ? 250 : width / 2 - sizes.px20,
    height: (Platform.OS === 'web') ? 200 : width / 2 - sizes.px20,
    overflow: "hidden",
  },
  image: {
    width: (Platform.OS === 'web') ? '90%' : 150,
    height: (Platform.OS === 'web') ? '100%' : 100,
  },
  favoriteIcon: {
    position: "absolute",
    right: sizes.px5,
    overflow: "hidden",
  },
  title: {
    fontFamily: 'MontserratSemiBold',
    fontSize: sizes.px20,
    marginTop: sizes.px10,
    marginBottom: sizes.px5,
  },
  description: {
    fontSize: sizes.px15
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: sizes.px10,
  },
  price: {
    marginRight: sizes.px5,
    fontSize: sizes.px10,
  },
  showMore: {
    paddingHorizontal: sizes.px10,
    paddingVertical: sizes.px10,
    borderRadius: sizes.px15,
    border: shapes.borderYellow,
    backgroundColor: colors.transparent,
  },
  showMoreText: {
    marginRight: sizes.px5,
    fontSize: sizes.px10,
  }
})