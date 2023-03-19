import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { SelectedItem } from '../../data/SelectedItem'
import storageKeys from '../../constants/storageKeys'
import useStorage from '../../context/storage'
import { View } from '../../ui/components/Themed'
import { SelectedItemView } from '../../components/SelectedItemView'
import { CartTotal } from '../../components/CartTotal'
import { NoItemsView } from '../../components/NoItemsView'


export default function ShoppingCartScreen() {
  const { getAll, setAll, removeItem } = useStorage<SelectedItem>(storageKeys.shoppingcart)
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

  const totalPrice = items.reduce((total, item) => {
    return total + parseFloat(item.price) * item.quantity
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
          />}
        ListFooterComponent={CartTotal(totalPrice)}
        ListEmptyComponent={NoItemsView}
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
