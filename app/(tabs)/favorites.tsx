import { useState, useEffect } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import storageKeys from '../../constants/storageKeys'
import { CartItem } from '../../data/CartItem'
import colors from '../../ui/colors'
import { Text, View } from '../../ui/Themed'
import useStorage from '../../context/storage'
import { FavoritesView } from '../../components/FavoritesView'
import { useToast } from 'react-native-toast-notifications'


export default function FavoritesScreen() {
  const toast = useToast()
  const { getAll, setAll, addItem, removeItem } = useStorage<CartItem>(storageKeys.favorites)
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const getItems = async () => {
      const items = await getAll()
      setItems(items.map(item => item as CartItem))
    }

    getItems()
  }, [])

  const handleAddToCart = async (item: CartItem) => {
    addItem(item, storageKeys.shoppingcart)
    toast.show(`${item.title} added to cart`, { type: "success" })
  }

  const handleRemoveItem = async (item: CartItem) => {
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
          <FavoritesView
            item={item}
            onAddToCart={() => handleAddToCart(item)}
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
