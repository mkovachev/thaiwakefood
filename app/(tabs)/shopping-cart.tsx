import { StyleSheet, FlatList } from 'react-native'
import { CartItem } from '../../data/CartItem'
import { View } from '../../ui/components/Themed'
import { CartItemListView } from '../../components/CartItemListView'
import { CartTotal } from '../../components/CartTotal'
import { EmptyView } from '../../components/EmptyView'
import { useRecoilState } from 'recoil'
import { cartAtom, ordersAtom } from '../../context/recoil'
import { useToast } from 'react-native-toast-notifications'
import { CheckoutButton } from '../../components/CheckoutButton'
import { Order } from '../../data/Order'
import { OrderStatus } from '../../data/OrderStatus'
import { useRouter } from 'expo-router'

export default function ShoppingCartScreen() {
  const toast = useToast()
  const router = useRouter()
  const [cartItems, setCartItems] = useRecoilState(cartAtom)
  const [orders, setOrders] = useRecoilState(ordersAtom)

  const cartTotal = cartItems.length > 0 ? cartItems.reduce((total, item) => {
    return total + (item.price * item.amount)
  }, 0) : 0

  const handleRemoveItem = (item: CartItem) => {
    const updatedItems = cartItems.filter(i => i.id !== item.id)
    setCartItems(updatedItems)
    toast.show(`${item.title} removed successfully`, { type: 'danger' })
  }

  const handleItemAmountChange = (item: CartItem, amountChange: number) => {
    const updatedItem = { ...item, amount: item.amount + amountChange }
    if (updatedItem.amount < 1) return
    setCartItems(items => items.map(i => i.id === updatedItem.id ? updatedItem : i))
  }

  const handleCheckout = () => {
    let id = 1
    if (orders.length > 0) id = Number(orders[orders.length - 1].id) + 1

    const order: Order = {
      id: id.toString(),
      total: cartTotal,
      items: cartItems,
      status: OrderStatus.PendingPayment,
    }
    setOrders(orders => [...orders, order])
    setCartItems([])
    router.push('/orders')
    toast.show('Order created successfully', { type: 'success' })
  }


  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => `${item.id}${item.option}`}
        renderItem={({ item }) =>
          <CartItemListView
            item={item}
            onRemove={() => handleRemoveItem(item)}
            onAmountChange={(newAmount) => handleItemAmountChange(item, newAmount - item.amount)}
          />}
        ListFooterComponent={
          <>
            {cartTotal > 0 && <CartTotal total={cartTotal} />}
            {cartTotal > 0 && <CheckoutButton onCheckout={handleCheckout} />}
          </>
        }
        ListEmptyComponent={<EmptyView />}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
