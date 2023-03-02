import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet, Image, Pressable } from 'react-native'
import { View } from '../ui/Themed'
import colors from "../ui/colors"
import { FoodItemDto } from '../data/FoodItemDto'
import { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { parseShoppingCartItem } from '../utils/parseShoppingCartItem'
import sizes from '../ui/sizes'
import { Text } from '../ui/Themed'

interface Props {
  foodItem: FoodItemDto
  visible: boolean
}

export default function FoodItemDetails({ foodItem, visible }: Props) {
  const [, setVisible] = useState(visible)

  const addToCart = (foodItem: FoodItemDto) => {
    const shoppingCartItem = parseShoppingCartItem(foodItem)
    console.log(shoppingCartItem)
  }

  const addToFavorites = (foodItem: FoodItemDto) => {
    const shoppingCartItem = parseShoppingCartItem(foodItem)
    console.log(shoppingCartItem)
  }

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Image style={styles.foodItemImage} source={{ uri: foodItem.image }} />
        <Text style={styles.title}>{foodItem.title}</Text>
        <Text style={styles.description}>{foodItem.description}</Text>

        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </View>
      <View style={styles.actions}>
        <Pressable onPressIn={() => addToCart(foodItem)}>
          <Feather name="heart" size={24} />
        </Pressable>
        <Pressable onPressIn={() => addToFavorites(foodItem)}>
          <Feather name="shopping-cart" size={24} />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.transparent,
  },
  details: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'MontserratMedium',
    fontSize: 18,
  },
  description: {
    fontFamily: 'MontserratMedium',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  foodItemImage: {
    width: 200,
    height: 200,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: sizes.px15
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})
