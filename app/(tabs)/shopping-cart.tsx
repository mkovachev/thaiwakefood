import { StyleSheet, FlatList } from 'react-native'
import { CartItem } from '../../data/CartItem'
import { View } from '../../ui/components/Themed'
import { CartItemView } from '../../components/CartItemView'
import { CartTotal } from '../../components/CartTotal'
import { EmptyView } from '../../components/EmptyView'
import { useRecoilState } from 'recoil'
import { cartAtom } from '../../context/recoil'
import { useToast } from 'react-native-toast-notifications'


export default function ShoppingCartScreen() {
  const toast = useToast()
  const [items, setItems] = useRecoilState(cartAtom)

  const handleRemoveItem = (item: CartItem) => {
    const updatedItems = items.filter(i => i.id !== item.id)
    setItems(updatedItems)
    toast.show(`${item.title} removed from cart`, { type: 'danger' })
  }

  const handleItemAmountChange = (item: CartItem, amountChange: number) => {
    const updatedItem = { ...item, amount: item.amount + amountChange }
    if (updatedItem.amount < 1) return
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
        //extraData={items}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
