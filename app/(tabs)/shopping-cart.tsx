import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import ShoppingCartItemCard from '../../components/ShoppingCartItemCard'
import { ShoppingCartItem } from '../../data/ShoppingCartItem'
import storageKeys from '../../constants/storageKeys'
import useStorage from '../../context/storage'
import { View, Text } from '../../ui/Themed'
import colors from '../../ui/colors'
import { useRouter } from 'expo-router'


export default function ShoppingCartScreen() {
  const { getAll, setAll, setItem, removeItem } = useStorage<ShoppingCartItem>(storageKeys.SHOPPING_CART_KEY)
  const router = useRouter()
  const [items, setItems] = useState<ShoppingCartItem[]>([])

  useEffect(() => {
    const getItems = async () => {
      const items = await getAll()
      setItems(items.map(item => item as ShoppingCartItem))
    }

    getItems()
  }, [])

  const handleEditItem = async (item: ShoppingCartItem) => {
    router.push(`/${item.id}`)
    await setItem(item.id, item)
    const updatedItems = items.filter(i => i.id !== item.id)
    setItems(updatedItems)
    setAll(updatedItems)
  }

  const handleRemoveItem = async (item: ShoppingCartItem) => {
    await removeItem(item.id)
    const updatedItems = items.filter(i => i.id !== item.id)
    setItems(updatedItems)
    setAll(updatedItems)
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
    backgroundColor: colors.white,
  },
})
