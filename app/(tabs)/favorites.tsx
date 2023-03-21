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

  const handleItemAmountChange = (item: CartItem, amountChange: number) => {
    const updatedItem = { ...item, amount: item.amount + amountChange }

    if (updatedItem.amount < 1) return

    store.updateById(item.id, updatedItem)
    setItems(items => items.map(i => i.id === updatedItem.id ? updatedItem : i))
  }

  const handleAddToCart = (item: CartItem) => {
    store.addItem(item)
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
            onAmountChange={(newAmount) => handleItemAmountChange(item, newAmount - item.amount)}
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
