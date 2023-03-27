import { FlatList, StyleSheet } from 'react-native'
import { CartItem } from '../../data/CartItem'
import { CartItemListView } from '../../components/CartItemListView'
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
    toast.show(`${item.title} removed from favorites`, { type: 'danger' })
  }

  const handleItemAmountChange = (item: CartItem, amountChange: number) => {
    const updatedItem = { ...item, amount: item.amount + amountChange }
    if (updatedItem.amount < 1) return
    setFavoriteItems(items => items.map(i => i.id === updatedItem.id ? updatedItem : i))
  }

  const handleAddToCart = (item: CartItem) => {
    const existingItem = cartItems.find(i => i.id === item.id && i.option === item.option)
    if (existingItem) {
      const updatedItem = { ...existingItem, amount: existingItem.amount + 1 }
      setCartItems(items => items.map(i => i.id === updatedItem.id ? updatedItem : i))
    } else {
      setCartItems(items => [...items, item])
    }
    toast.show(`${item.title} added to cart`, { type: 'success' })
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteItems}
        keyExtractor={(item) => `${item.id}${item.option}`}
        renderItem={({ item }) =>
          <CartItemListView
            item={item}
            onRemove={() => handleRemoveItem(item)}
            onAmountChange={(newAmount) => handleItemAmountChange(item, newAmount - item.amount)}
            onAddToCart={() => handleAddToCart(item)}
            isInFavorites={true}
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
