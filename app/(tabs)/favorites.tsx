import { useState, useEffect } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { CartItem } from '../../data/CartItem'
import { CartItemView } from '../../components/CartItemView'
import { View } from '../../ui/components/Themed'
import { EmptyView } from '../../components/EmptyView'
import { favorites } from '../../context/store'


export default function FavoritesScreen() {
  const { operations: store } = favorites
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

  const handleAddToCart = (item: CartItem) => {
    store.addItem(item)
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

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => `${item.id}${item.option}`}
        renderItem={({ item }) =>
          <CartItemView
            item={item}
            onAddToCart={() => handleAddToCart(item)}
            onRemove={() => handleRemoveItem(item)}
            onAmountDecrease={() => handleItemAmountDecrease(item)}
            onAmountIncrease={() => handleItemAmountIncrease(item)}
            isInFavorites={true}
          />}
        ListEmptyComponent={<EmptyView />}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
