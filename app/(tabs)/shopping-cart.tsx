import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import ShoppingCartItemCard from '../../components/ShoppingCartItemCard'
import { ShoppingCartItem } from '../../data/ShoppingCartItem'
import storageKeys from '../../constants/storageKeys'
import useStorage from '../../context/storage'
import colors from '../../ui/colors'
import { View, Text } from '../../ui/Themed'
import fontFamily from '../../ui/fontFamily'


export default function ShoppingCartScreen() {
  const { getAll, setItem, removeItem } = useStorage<ShoppingCartItem>(storageKeys.SHOPPING_CART_KEY)
  const [items, setItems] = useState<ShoppingCartItem[]>([])

  useEffect(() => {
    const getItems = async () => {
      const items = await getAll()
      setItems(items.map(item => item as ShoppingCartItem))
    }

    getItems()
  }, [getAll])

  const handleEditItem = async (item: ShoppingCartItem) => {
    await setItem(item.id, item)
    setItems(items => items.map(i => i.id === item.id ? item : i))
  }

  const handleRemoveItem = async (item: ShoppingCartItem) => {
    await removeItem(item.id)
    setItems(items => items.map(i => i.id === item.id ? item : i))
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          <ShoppingCartItemCard
            item={item}
            onEdit={() => handleEditItem(item)}
            onRemove={() => handleRemoveItem(item)}
          />}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
})
