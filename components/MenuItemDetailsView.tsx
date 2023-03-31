import React, { useState } from "react"
import { MenuItem } from "../data/MenuItem"
import { StyleSheet, Image, Platform, Switch } from "react-native"
import { RadioButton } from "react-native-paper"
import { View, Text } from "../ui/components/Themed"
import colors from '../ui/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { parseCartItem } from '../utils/parseCartItem'
import fontFamily from '../ui/fontFamily'
import { formatInTHB } from '../utils/formatInTHB'
import { Feather } from '@expo/vector-icons'
import { useRecoilState } from 'recoil'
import { cartAtom, favoritesAtom } from '../context/recoil'
import { CartItem } from '../data/CartItem'
import { useToast } from 'react-native-toast-notifications'
import Pressable from '../ui/components/Pressable'


interface Props {
  item: MenuItem
}

export const MenuItemDetailsView = ({ item }: Props) => {
  const toast = useToast()
  const [cartItems, setCartItems] = useRecoilState(cartAtom)
  const [favoriteItems, setFavoriteItems] = useRecoilState(favoritesAtom)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [spicy, setSpicy] = useState(false)

  const handleAddToCart = async () => {
    if (item.options && !selectedOption) {
      toast.show('Please select an option', { type: 'warning' })
      return
    }
    const cartItem = parseCartItem(item, selectedOption || '')
    const existingItem = cartItems.find(i => i.id === cartItem.id && i.option === cartItem.option)
    if (existingItem) {
      const updatedItem: CartItem = { ...existingItem, quantity: existingItem.quantity + 1 }
      setCartItems(items => items.map(i => i.id === updatedItem.id ? updatedItem : i))
    } else {
      setCartItems(items => [...items, cartItem])
    }
    toast.show(`${item.name} added to cart`, { type: 'success' })
  }

  const handleAddToFavorites = async () => {
    if (item.options && !selectedOption) {
      toast.show('Please select an option', { type: 'warning' })
      return
    }
    const cartItem = parseCartItem(item, selectedOption || '')
    const existingItem = favoriteItems.find(i => i.id === cartItem.id && i.option === cartItem.option)
    if (existingItem) {
      const updatedItem: CartItem = { ...existingItem, quantity: existingItem.quantity + 1 }
      setFavoriteItems(items => items.map(i => i.id === updatedItem.id ? updatedItem : i))
    } else {
      setFavoriteItems(items => [...items, cartItem])
    }
    toast.show(`${item.name} added to favorites`, { type: 'success' })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.image} source={require('../assets/images/fast-food.png')} />
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.actions}>
          <Pressable
            onPress={handleAddToFavorites}
            icon={<Feather size={24} name="heart" color={colors.red} />}
          />
          <Pressable
            onPress={handleAddToCart}
            icon={<Feather size={24} name="shopping-bag" />}
          />
        </View>
      </View>
      <View style={styles.optionsContainer}>
        {item.options && item.options.length > 0 &&
          <View>
            <Text>Options:</Text>
            {item.options.map((option, index) => (
              <View key={index} style={styles.foodOptions}>
                <RadioButton
                  value={option.label}
                  status={selectedOption === option.label ? 'checked' : 'unchecked'}
                  color={colors.yellow}
                  uncheckedColor={colors.blueLight}
                  onPress={() => setSelectedOption(option.label)}
                />
                <Text style={styles.optionLabel}>{option.label}</Text>
                <Text style={styles.optionPrice}>{formatInTHB(option.value)}</Text>
              </View>
            ))}
          </View>
        }
        {!item.options && item.price &&
          <Text style={styles.price}>
            Price: {formatInTHB(item.price)}
          </Text>
        }
        {item.spicy &&
          <View style={styles.spicyContainer}>
            <Text style={styles.spicyLabel}>Spicy:</Text>
            <Switch
              value={spicy}
              onValueChange={() => setSpicy(!spicy)}
            />
          </View>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
  },
  actions: {
    justifyContent: 'space-between',
  },
  optionsContainer: {
    marginVertical: 20,
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
  name: {
    flex: 1,
    fontFamily: fontFamily.MontserratMedium,
    fontSize: Platform.OS === 'web' ? 20 : 16,
    marginHorizontal: 10,
  },
  description: {
    fontFamily: fontFamily.Montserrat,
    fontSize: Platform.OS === 'web' ? 16 : 12,
    marginHorizontal: 10,
  },
  foodOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  optionLabel: {
    margin: 8,
  },
  optionPrice: {
    fontFamily: fontFamily.MontserratMedium,
  },
  price: {
    fontFamily: fontFamily.MontserratMedium,
    fontSize: Platform.OS === 'web' ? 18 : 14,
    marginHorizontal: 10,
  },
  spicyContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  spicyLabel: {
    marginRight: 8,
  }
})