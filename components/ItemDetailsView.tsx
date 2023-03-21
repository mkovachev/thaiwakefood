import React, { useState } from "react"
import { MenuItem } from "../data/MenuItem"
import { StyleSheet, Image, Platform, Pressable, Switch } from "react-native"
import { RadioButton } from "react-native-paper"
import { View, Text } from "../ui/components/Themed"
import colors from '../ui/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { parseCartItem } from '../utils/parseCartItem'
import fontFamily from '../ui/fontFamily'
import { formatInTHB } from '../utils/formatInTHB'
import { Feather } from '@expo/vector-icons'
import { cart, favorites } from '../context/store'


interface Props {
  item: MenuItem
}

export const ItemDetailsView = ({ item }: Props) => {
  const { operations: cartStore } = cart
  const { operations: favoritesStore } = favorites
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [spicy, setSpicy] = useState(false)

  const handleAddToCart = async () => {
    if (item.options && !selectedOption) {
      return
    }

    const cartItem = parseCartItem(item, selectedOption || '')
    cartStore.addItem(cartItem)
  }

  const handleAddToFavorites = async () => {
    if (item.options && !selectedOption) {
      return
    }

    const cartItem = parseCartItem(item, selectedOption || '')
    favoritesStore.addItem(cartItem)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.image} source={require('../assets/images/fast-food.png')} />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </View>

      <View style={styles.optionsContainer}>

        {item.options && item.options.length > 0 &&
          <View>
            <Text>Choose option:</Text>
            {item.options.map((option, index) => (
              <View key={index} style={styles.foodOptions}>
                <RadioButton
                  value={option.label}
                  status={selectedOption === option.label ? 'checked' : 'unchecked'}
                  color={colors.black}
                  uncheckedColor={colors.grey}
                  onPress={() => setSelectedOption(option.label)}
                />
                <Text style={styles.optionLabel}>{option.label}</Text>
                <Text style={styles.optionPrice}>{option.value}</Text>
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

      <View style={styles.actions}>
        <Pressable onPress={handleAddToCart}>
          <Feather size={24} name="shopping-bag" color={colors.blue} />
        </Pressable>
        <Pressable onPress={handleAddToFavorites}>
          <Feather size={24} name="heart" color={colors.orange} />
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.white,
    paddingHorizontal: 12,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
  optionsContainer: {
    marginVertical: 20,
  },
  title: {
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
    fontFamily: fontFamily.MontserratMedium
  },
  priceOptionsContainer: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
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
  },
  spicy: {
    fontSize: 16,
    marginRight: 8,
  },
  addToCart: {
    alignSelf: 'center',
    marginVertical: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.yellow,
    borderStyle: 'solid',
  },
  addToCartText: {
    fontFamily: fontFamily.MontserratMedium,
    marginRight: 5,
    fontSize: Platform.OS === 'web' ? 16 : 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 8

  }
})