import React, { useState } from "react"
import { FoodItemDto } from "../data/FoodItemDto"
import { StyleSheet, Image, Platform, TouchableOpacity, Switch } from "react-native"
import { RadioButton } from "react-native-paper"
import { View, Text } from "../ui/Themed"
import colors from '../ui/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ShoppingCartItem } from '../data/ShoppingCartItem'
import { useToast } from 'react-native-toast-notifications'
import storageKeys from '../constants/storageKeys'
import useStorage from '../context/storage'
import { parseShoppingCartItem } from '../utils/parseShoppingCartItem'


type Props = {
  item: FoodItemDto
}

export const FoodItemDetails = ({ item }: Props) => {
  const toast = useToast()
  const { addItem } = useStorage<ShoppingCartItem>(storageKeys.SHOPPING_CART_KEY)
  const [selectedOption, setSelectedOption] = useState('')
  const [spicy, setSpicy] = useState(false)

  const handleAddToCart = () => {
    const shoppingCartItem = parseShoppingCartItem(item, selectedOption)
    addItem(shoppingCartItem, storageKeys.SHOPPING_CART_KEY)
    toast.show(`${shoppingCartItem.title} added to cart!`, { type: "success" })
  }

  console.log(item)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>

      <View style={styles.options}>

        {item.options && item.options.length > 0 &&
          <View>
            <Text>Choose option:</Text>
            {item.options.map((option, index) => (
              <View key={index} style={styles.optionContainer}>
                <RadioButton
                  value={option.label}
                  status={selectedOption === option.label ? 'checked' : 'unchecked'}
                  color={colors.black}
                  uncheckedColor={colors.black}
                  onPress={() => setSelectedOption(option.label)}
                />
                <Text style={styles.optionLabel}>{option.label}</Text>
                <Text style={styles.optionPrice}>{option.value}</Text>
              </View>
            ))}
          </View>
        }

        {!item.options &&
          <View style={styles.pricesContainer}>
            {item.prices?.map((price, index) => (
              <Text key={`${item.id}-${index}`} style={styles.prices}>
                ${price}
              </Text>
            ))}
          </View>
        }

        {item.spicy &&
          <View style={styles.spicyContainer}>
            <Text style={styles.spicyLabel}>Spicy:</Text>
            <Switch
              value={spicy}
              onValueChange={() => setSpicy(!spicy)}
              ios_backgroundColor="#3e3e3e"
            />
          </View>
        }

        <TouchableOpacity onPress={handleAddToCart} style={styles.addToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
  options: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    marginBottom: 16,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    marginTop: 16,
  },
  optionLabel: {
    margin: 8,
  },
  optionPrice: {

  },
  pricesContainer: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  prices: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spicyContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  spicyLabel: {
    marginRight: 8,
  },
  spicy: {
    fontSize: 16,
    marginRight: 8,
  },
  addToCart: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.yellow,
    borderStyle: 'solid',
  },
  addToCartText: {
    fontFamily: 'MontserratMedium',
    marginRight: 5,
    fontSize: Platform.OS === 'web' ? 16 : 14,
  }
})