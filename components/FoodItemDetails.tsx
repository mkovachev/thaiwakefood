import React, { useContext, useState } from "react"
import { FoodItemDto } from "../data/FoodItemDto"
import { StyleSheet, Image, Platform, TouchableOpacity } from "react-native"
import { RadioButton } from "react-native-paper"
import { View, Text } from "../ui/Themed"
import { Link } from 'expo-router'
import colors from '../ui/colors'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ShoppingCartItem } from '../data/ShoppingCartItem'
import { useToast } from 'react-native-toast-notifications'
import storageKeys from '../constants/storageKeys'
import useStorage from '../context/storage'
import { parseShoppingCartItem } from '../utils/parseShoppingCartItem'


type Props = {
  item: FoodItemDto
}

const FoodItemDetails = ({ item }: Props) => {
  const toast = useToast();
  const { addItem } = useStorage<ShoppingCartItem>(storageKeys.SHOPPING_CART_KEY)
  const [selectedOption, setSelectedOption] = useState('')

  const handleAddToCart = () => {
    const shoppingCartItem = parseShoppingCartItem(item, selectedOption)
    addItem(shoppingCartItem, storageKeys.SHOPPING_CART_KEY)
    toast.show(`${shoppingCartItem.title} added to cart!`, { type: "success" })
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Link href="/" style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={styles.backButtonText}>Back to Home</Text>
        </Link>
      </View>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        {item.options && item.options.length > 0 ? (
          <View style={styles.optionsContainer}>
            {item.options.map((option, index) => (
              <View key={index} style={styles.optionContainer}>
                <RadioButton
                  value={option.label}
                  status={selectedOption === option.label ? 'checked' : 'unchecked'}
                  color={colors.yellow}
                  uncheckedColor={colors.blue}
                  onPress={() => setSelectedOption(option.label)}
                />
                <Text style={styles.optionLabel}>{option.label}</Text>
                <Text style={styles.optionPrice}>{option.value}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.pricesContainer}>
            {item.prices?.map((price, index) => (
              <Text key={`${item.id}-${index}`} style={styles.prices}>
                ${price}
              </Text>
            ))}
          </View>
        )}

        {item.spicy && item.spicy.length > 0 && (
          <View style={styles.spicyContainer}>
            <Text style={styles.spicyLabel}>Spicy:</Text>
            {item.spicy.map((level, index) => (
              <Text key={index} style={styles.spicy}>
                {level}
              </Text>
            ))}
          </View>
        )}
      </View>

      <TouchableOpacity onPress={handleAddToCart} style={styles.addToCart}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default FoodItemDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.yellow,
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingLeft: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  image: {
    height: 200,
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginTop: 16,
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    color: colors.grey,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  optionsContainer: {
    marginTop: 16,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  optionLabel: {
    fontSize: 16,
    margin: 8,
  },
  optionPrice: {
    fontSize: 16,
  },
  pricesContainer: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  prices: {
    fontSize: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  spicyContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  spicyLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  spicy: {
    fontSize: 16,
    marginRight: 8,
    color: colors.blue,
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