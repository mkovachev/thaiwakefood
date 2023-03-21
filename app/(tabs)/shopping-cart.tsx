import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { CartItem } from '../../data/CartItem'
import { View } from '../../ui/components/Themed'
import { CartItemView } from '../../components/CartItemView'
import { CartTotal } from '../../components/CartTotal'
import { EmptyView } from '../../components/EmptyView'
import { cart } from '../../context/store'

export default function ShoppingCartScreen() {
  const { operations: store } = cart
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const items = store.getAll()
      setItems(items)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const handleRemoveItem = (item: CartItem) => {
    store.removeById(item.id)
    const updatedItems = items.filter(i => i.id !== item.id)
    setItems(updatedItems)
  }

  const handleItemAmountDecrease = (item: CartItem) => {
    if (item.amount === 1) return
    item.amount -= 1
    store.updateById(item.id, item)
    setItems(prevItems => {
      const updatedItems = [...prevItems]
      const index = updatedItems.findIndex(i => i.id === item.id)
      updatedItems[index] = item
      return updatedItems
    })
  }

  const handleItemAmountIncrease = (item: CartItem) => {
    item.amount += 1
    store.updateById(item.id, item)
    setItems(prevItems => {
      const updatedItems = [...prevItems]
      const index = updatedItems.findIndex(i => i.id === item.id)
      updatedItems[index] = item
      return updatedItems
    })
  }

  const cartTotal = items.length > 0 ? items.reduce((total, item) => {
    return total + (item.price * item.amount)
  }, 0) : 0;


  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => `${item.id}${item.option}`}
        renderItem={({ item }) =>
          <CartItemView
            item={item}
            onRemove={() => handleRemoveItem(item)}
            onAmountDecrease={() => handleItemAmountDecrease(item)}
            onAmountIncrease={() => handleItemAmountIncrease(item)}
          />}
        ListFooterComponent={<CartTotal total={cartTotal} />}
        ListEmptyComponent={<EmptyView />}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
