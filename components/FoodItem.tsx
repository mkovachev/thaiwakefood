import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { FoodItemDto } from "../data/FoodItemDto";
import { Image, StyleSheet, View, TouchableOpacity, Dimensions, Platform } from "react-native";
import { Text } from './Themed';
import colors from "../ui/colors";
import React from "react";
import shapes from "../ui/shapes";

interface Props {
  foodItem: FoodItemDto
}

const { width } = Dimensions.get("window")

export default function FoodItem({ foodItem }: Props) {
  return (
    <View key={foodItem.id} style={styles.foodItem}>
      <BlurView tint="default" intensity={90} style={{ padding: shapes.spacing10 }}>
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
    justifyContent: "center",
  },
  foodItem: {
    marginHorizontal: shapes.spacing10,
    marginVertical: shapes.spacing10,
    border: `1px solid ${colors.black}`,
    borderRadius: shapes.borderRadius20,
    overflow: "hidden",
  },
  touchableFoodItem: {
    width: (Platform.OS === 'web') ? 300 : width / 2 - shapes.spacing10 * 2,
    height: (Platform.OS === 'web') ? 200 : width / 2 - shapes.spacing10 * 2,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: shapes.borderRadius15,
  },
  favoriteIcon: {
    position: "absolute",
    right: shapes.spacing10,
    overflow: "hidden",
  },
  title: {
    color: colors.black,
    fontWeight: "600",
    fontSize: shapes.spacing10 * 1.7,
    marginTop: 10,
    marginBottom: shapes.spacing10 / 2,
  },
  description: {
    color: colors.black,
    fontSize: shapes.spacing10 * 1.2
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: shapes.spacing10 / 2,
  },
  price: {
    color: colors.black,
    marginRight: shapes.spacing10 / 2,
    fontSize: shapes.spacing10 * 1.6,
  },
  showMore: {
    padding: shapes.spacing10 / 2,
    borderRadius: shapes.borderRadius15,
  }
});