import { FlatList, StyleSheet } from 'react-native'
import { CartItem } from '../../data/CartItem'
import { SelectedItemListView } from '../../components/SelectedItemListView'
import { View } from '../../ui/components/Themed'
import { EmptyView } from '../../components/EmptyView'
import { useRecoilState } from 'recoil'
import { cartAtom, favoritesAtom } from '../../context/recoil'
import { useToast } from 'react-native-toast-notifications'


export default function FavoritesScreen() {
  const toast = useToast()
  const [cartItems, setCartItems] = useRecoilState(cartAtom)
  const [favoriteItems, setFavoriteItems] = useRecoilState(favoritesAtom)

  const handleRemoveItem = (item: CartItem) => {
    const updatedItems = favoriteItems.filter(i => i.id !== item.id)
    setFavoriteItems(updatedItems)
    toast.show(`${item.name} removed`, { type: 'danger' })
  }

  const handleAddToCart = (item: CartItem) => {
    const existingItem = cartItems.find(i => i.id === item.id && i.option === item.option)
    if (existingItem) {
      const updatedItem = { ...existingItem, amount: existingItem.quantity + 1 }
      setCartItems(items => items.map(i => i.id === updatedItem.id ? updatedItem : i))
    } else {
      setCartItems(items => [...items, item])
    }
    toast.show(`${item.name} ${item.option} added to cart`, { type: 'success' })
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteItems}
        keyExtractor={(item) => `${item.id}${item.option}`}
        renderItem={({ item }) =>
          <SelectedItemListView
            item={item}
            onRemove={() => handleRemoveItem(item)}
            onAddToCart={() => handleAddToCart(item)}
          />}
        ListEmptyComponent={<EmptyView />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
