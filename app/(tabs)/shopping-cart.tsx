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

  const handleItemAmountChange = (item: CartItem, amountChange: number) => {
    const updatedItem = { ...item, amount: item.amount + amountChange }

    if (updatedItem.amount < 1) return

    store.updateById(item.id, updatedItem)
    setItems(items => items.map(i => i.id === updatedItem.id ? updatedItem : i))
  }


  const cartTotal = items.length > 0 ? items.reduce((total, item) => {
    return total + (item.price * item.amount)
  }, 0) : 0


  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => `${item.id}${item.option}`}
        renderItem={({ item }) =>
          <CartItemView
            item={item}
            onRemove={() => handleRemoveItem(item)}
            onAmountChange={(newAmount) => handleItemAmountChange(item, newAmount - item.amount)}
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
