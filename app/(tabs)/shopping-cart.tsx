import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { SelectedItem } from '../../data/SelectedItem'
import storageKeys from '../../constants/storageKeys'
import useStorage from '../../context/storage'
import { View } from '../../ui/components/Themed'
import { SelectedItemView } from '../../components/SelectedItemView'
import { CartTotal } from '../../components/CartTotal'
import { EmptyView } from '../../components/EmptyView'


export default function ShoppingCartScreen() {
  const { getAll, setAll, setItem, removeItem } = useStorage<SelectedItem>(storageKeys.shoppingcart)
  const [items, setItems] = useState<SelectedItem[]>([])

  useEffect(() => {
    const getItems = async () => {
      const items = await getAll()
      setItems(items.map(item => item as SelectedItem))
    }
    getItems()
  }, [])

  const handleRemoveItem = async (item: SelectedItem) => {
    await removeItem(item.id)
    const updatedItems = items.filter(i => i.id !== item.id)
    setItems(updatedItems)
    await setAll(updatedItems)
  }

  const handleItemAmountDecrease = async (item: SelectedItem) => {
    if (item.amount === 1) return
    item.amount -= 1
    await setItem(item.id, item)
  }

  const handleItemAmountIncrease = async (item: SelectedItem) => {
    item.amount += 1
    await setItem(item.id, item)
  }

  const cartTotal = items.reduce((total, item) => {
    return total + (item.price * item.amount)
  }, 0)

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => `${item.id}${item.option}`}
        renderItem={({ item }) =>
          <SelectedItemView
            item={item}
            onRemove={() => handleRemoveItem(item)}
            onAmountDecrease={() => handleItemAmountDecrease(item)}
            onAmountIncrease={() => handleItemAmountIncrease(item)}
          />}
        ListFooterComponent={CartTotal(cartTotal)}
        ListEmptyComponent={EmptyView}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'flex-end',
  }
})
