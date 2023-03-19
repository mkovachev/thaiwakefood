import { useState, useEffect } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import storageKeys from '../../constants/storageKeys'
import { SelectedItem } from '../../data/SelectedItem'
import colors from '../../ui/colors'
import useStorage from '../../context/storage'
import { SelectedItemView } from '../../components/SelectedItemView'
import { useToast } from 'react-native-toast-notifications'
import { View } from '../../ui/components/Themed'
import { EmptyView } from '../../components/EmptyView'


export default function FavoritesScreen() {
  const toast = useToast()
  const { getAll, setAll, addItem, removeItem } = useStorage<SelectedItem>(storageKeys.favorites)
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
    toast.show(`${item.title} added to cart`, { type: "success" })
  }

  const handleRemoveItem = async (item: SelectedItem) => {
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
          <SelectedItemView
            item={item}
            onAddToCart={() => handleAddToCart(item)}
            onRemove={() => handleRemoveItem(item)}
          />}
        ListEmptyComponent={EmptyView}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.white,
  }
})
