import { Feather } from "@expo/vector-icons"
import { BlurView } from "expo-blur"
import { FoodItemDto } from "../data/FoodItemDto"
import { Image, StyleSheet, View, TouchableOpacity, Dimensions, Platform } from "react-native"
import { Text } from '../ui/Themed'
import colors from "../ui/colors"
import React from "react"
import sizes from "../ui/sizes"
import shapes from "../ui/shapes"

interface Props {
  foodItem: FoodItemDto
}

const { width } = Dimensions.get("window")

export default function FoodItem({ foodItem }: Props) {

  const showDetails = (id: number) => {

  }

  return (
    <View key={foodItem.id} style={styles.foodItem}>
      <BlurView tint="default" intensity={90} style={{ padding: sizes.px10 }}>
        <TouchableOpacity style={styles.touchableFoodItem}>
          <Image source={{ uri: foodItem.image }} style={styles.image} />
          <View style={styles.favoriteIcon}>
            <Feather name="heart" size={24} />
          </View>
        </TouchableOpacity>
        <Text numberOfLines={2} style={styles.title}>
          {foodItem.title}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {foodItem.description}
        </Text>
        <View style={styles.actions}>
          <Text style={styles.price}>
            price
          </Text>
          <TouchableOpacity style={styles.showMore} onPress={() => showDetails(foodItem.id)}>
            <Text style={styles.price}>
              show details
            </Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  foodItem: {
    marginHorizontal: sizes.px10,
    marginVertical: sizes.px10,
    border: shapes.borderYellow,
    borderRadius: sizes.px20,
    overflow: "hidden",
  },
  touchableFoodItem: {
    width: (Platform.OS === 'web') ? 250 : width / 2 - sizes.px10 * 2,
    height: (Platform.OS === 'web') ? 200 : width / 2 - sizes.px10 * 2,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: sizes.px15,
  },
  favoriteIcon: {
    position: "absolute",
    right: sizes.px10,
    overflow: "hidden",
  },
  title: {
    fontFamily: 'MontserratSemiBold',
    color: colors.black,
    fontSize: sizes.px10 * 1.7,
    marginTop: 10,
    marginBottom: sizes.px10 / 2,
  },
  description: {
    color: colors.black,
    fontSize: sizes.px10 * 1.2
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: sizes.px10 / 2,
  },
  price: {
    color: colors.black,
    marginRight: sizes.px10 / 2,
    fontSize: sizes.px10 * 1.6,
  },
  showMore: {
    paddingHorizontal: sizes.px10,
    paddingVertical: sizes.px10,
    borderRadius: sizes.px15,
    border: shapes.borderYellow,
    elevation: 8,
    backgroundColor: colors.transparent,
  }
})