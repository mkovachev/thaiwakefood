import { StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { CartItem } from '../../data/CartItem'
import { View } from '../../ui/components/Themed'
import { CartItemView } from '../../components/CartItemView'
import { CartTotal } from '../../components/CartTotal'
import { EmptyView } from '../../components/EmptyView'
import { useRecoilState } from 'recoil'
import { cartAtom, ordersAtom } from '../../context/recoil'
import { useToast } from 'react-native-toast-notifications'
import { CheckoutButton } from '../../components/CheckoutButton'
import { Order } from '../../data/Order'
import { OrderStatus } from '../../data/OrderStatus'

export default function ShoppingCartScreen() {
  const toast = useToast()
  const [items, setItems] = useRecoilState(cartAtom)
  const [orders, setOrders] = useRecoilState(ordersAtom)

  console.log(orders)

  const cartTotal = items.length > 0 ? items.reduce((total, item) => {
    return total + (item.price * item.amount)
  }, 0) : 0

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

  const handleCheckout = () => {
    const lastOrderId = orders?.pop()?.id
    console.log(lastOrderId)
    const order: Order = {
      id: 1, //lastOrderId ? lastOrderId + 1 : 1,
      total: cartTotal,
      status: OrderStatus.Confirmed,
    }
    console.log(order)
    setOrders(orders => [...orders, order])
    toast.show('Order successfully created', { type: 'success' })
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
