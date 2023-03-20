import { useState, useEffect } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import storageKeys from '../../constants/storageKeys'
import { SelectedItem } from '../../data/SelectedItem'
import useStorage from '../../context/storage'
import { SelectedItemView } from '../../components/SelectedItemView'
import { View } from '../../ui/components/Themed'
import { EmptyView } from '../../components/EmptyView'


export default function FavoritesScreen() {
  const { getAll, addItem, setItem, removeItem } = useStorage<SelectedItem>(storageKeys.favorites)
  const [items, setItems] = useState<SelectedItem[]>([])

  useEffect(() => {
    const getItems = async () => {
      const items = await getAll()
      setItems(items.map(item => item as SelectedItem))
    }
    getItems()
  }, [])

  const handleAddToCart = async (item: SelectedItem) => {
    addItem(item, storageKeys.shoppingcart)
  }

  const handleRemoveItem = async (item: SelectedItem) => {
    await removeItem(item.id)
    const updatedItems = items.filter(i => i.id !== item.id)
    setItems(updatedItems)
  }

  const handleItemAmountDecrease = async (item: SelectedItem) => {
    if (item.amount === 1) return
    item.amount -= 1
    await setItem(item.id, item)
    setItems(prevItems => {
      const updatedItems = [...prevItems]
      const index = updatedItems.findIndex(i => i.id === item.id)
      updatedItems[index] = item
      return updatedItems
    })
  }

  const handleItemAmountIncrease = async (item: SelectedItem) => {
    item.amount += 1
    await setItem(item.id, item)
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
          <SelectedItemView
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
