import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { FoodItemDto } from "../data/FoodItemDto";
import { Image, StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import { Text } from './Themed';
import colors from "../constants/colors";
import React from "react";

interface Props {
  foodItem: FoodItemDto
}

const { width } = Dimensions.get("window")
const spacing = 10

export default function FoodItem({ foodItem }: Props) {
  return (
    <View key={foodItem.id} style={styles.foodItem}>
      <BlurView tint="default" intensity={90} style={{ padding: spacing }}>
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
          <TouchableOpacity style={styles.showMore}>
            <Text style={styles.price}>
              show more
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
    justifyContent: "space-between",
  },
  foodItem: {
    width: width / 2 - spacing * 2,
    marginBottom: spacing,
    borderRadius: spacing * 2,
    overflow: "hidden",
  },
  touchableFoodItem: {
    height: 150,
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: spacing * 2,
  },
  favoriteIcon: {
    position: "absolute",
    right: 0,
    borderBottomStartRadius: spacing * 3,
    borderTopEndRadius: spacing * 2,
    overflow: "hidden",
  },
  title: {
    color: colors.black,
    fontWeight: "600",
    fontSize: spacing * 1.7,
    marginTop: 10,
    marginBottom: spacing / 2,
  },
  description: {
    color: colors.black,
    fontSize: spacing * 1.2
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: spacing / 2,
  },
  price: {
    color: colors.black,
    marginRight: spacing / 2,
    fontSize: spacing * 1.6,
  },
  showMore: {
    padding: spacing / 2,
    borderRadius: spacing,
  }
});