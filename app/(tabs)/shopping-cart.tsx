import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import CartItemView from '../../components/CartItemView'
import { ShoppingCartItem } from '../../data/ShoppingCartItem'
import storageKeys from '../../constants/storageKeys'
import useStorage from '../../context/storage'
import { View, Text } from '../../ui/Themed'
import colors from '../../ui/colors'


export default function ShoppingCartScreen() {
  const { getAll, setAll, removeItem } = useStorage<ShoppingCartItem>(storageKeys.SHOPPING_CART_KEY)
  const [items, setItems] = useState<ShoppingCartItem[]>([])

  useEffect(() => {
    const getItems = async () => {
      const items = await getAll()
      setItems(items.map(item => item as ShoppingCartItem))
    }

    getItems()
  }, [])

  const handleRemoveItem = async (item: ShoppingCartItem) => {
    await removeItem(item.id)
    const updatedItems = items.filter(i => i.id !== item.id)
    setItems(updatedItems)
    await setAll(updatedItems)
  }

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
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.white,
  },
})
