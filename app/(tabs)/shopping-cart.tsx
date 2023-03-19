import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import CartItemView from '../../components/CartItemView'
import { CartItem } from '../../data/CartItem'
import storageKeys from '../../constants/storageKeys'
import useStorage from '../../context/storage'
import { View, Text } from '../../ui/Themed'
import colors from '../../ui/colors'
import fontFamily from '../../ui/fontFamily'
import { formatInTHB } from '../../utils/formatInTHB'


export default function ShoppingCartScreen() {
  const { getAll, setAll, removeItem } = useStorage<CartItem>(storageKeys.shoppingcart)
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const getItems = async () => {
      const items = await getAll()
      setItems(items.map(item => item as CartItem))
    }

    getItems()
  }, [])

  const handleRemoveItem = async (item: CartItem) => {
    await removeItem(item.id)
    const updatedItems = items.filter(i => i.id !== item.id)
    setItems(updatedItems)
    await setAll(updatedItems)
  }

  const totalPrice = items.reduce((total, item) => {
    return total + parseFloat(item.price) * item.quantity
  }, 0)

  const TotalFooter = () => (
    <View style={styles.total}>
      <Text style={styles.totalText}>Total: {formatInTHB(totalPrice)}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => `${item.id}${item.option}`}
        renderItem={({ item }) =>
          <CartItemView
            item={item}
            onRemove={() => handleRemoveItem(item)}
          />}
        ListFooterComponent={TotalFooter}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  total: {
    margin: 10,
    alignItems: 'flex-end',
  },
  totalText: {
    fontFamily: fontFamily.MontserratMedium,
    fontSize: 16,
  }
})
