import colors from '../ui/colors'
import { StyleSheet, FlatList } from 'react-native'
import { View, Text } from '../ui/components/Themed'
import { EmptyView } from '../components/EmptyView'
import { SelectedItemsTotal } from './SelectedItemsTotal'
import { Order } from '../data/Order'
import { OptionsDeliveryView } from './OptionsDeliveryView'
import { useRouter } from 'expo-router'
import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'
import { useToast } from 'react-native-toast-notifications'
import { useRecoilState } from 'recoil'
import { cartAtom, ordersAtom } from '../context/recoil'
import { CartItem } from '../data/CartItem'
import { DeliveryOptions } from '../data/DeliveryOptions'
import { PaymentOptions } from '../data/PaymentOptions'
import { generateOrderHTML } from '../utils/generateOrderHTML'
import * as FileSystem from 'expo-file-system'
import { useState } from 'react'
import { SelectedItemListView } from './SelectedItemListView'
import Pressable from '../ui/components/Pressable'
import { Ionicons } from '@expo/vector-icons'
import { OrderUsernameInput } from './OrderUsernameInput'
import { OptionsPaymentView } from './OptionsPaymentView'


interface Props {
  order: Order
}

export default function OrderDetailsView({ order }: Props) {
  const router = useRouter()
  const toast = useToast()
  const [orders, setOrders] = useRecoilState(ordersAtom)
  const [cartItems, setCartItems] = useRecoilState(cartAtom)
  const [paymentOption, setPaymentOption] = useState(order.payment)
  const [deliveryOption, setDeliveryOption] = useState(order.delivery)
  const [deliveryNote, setDeliveryNote] = useState(order.deliveryNote || '')
  const [user, setUser] = useState(order.user)

  const cartTotal = order.items.length > 0 ? order.items.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0) : 0

  const handleRemoveItem = (item: CartItem) => {
    const updatedItems = order.items.filter(i => i.id !== item.id)
    if (updatedItems.length === 0) {
      setOrders(orders => orders.filter(o => o.id !== order.id))
    } else {
      const updatedOrder = { ...order, items: updatedItems }
      setOrders(orders => [...orders.filter(o => o.id !== order.id), updatedOrder])
    }

    if (order.items.length === 1) {
      toast.show(`Order ${order.id} removed`, { type: 'danger' })
    } else {
      toast.show(`${item.name} removed`, { type: 'danger' })
    }

    router.push('/my-orders')
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

  const handleItemAmountChange = (item: CartItem, amountChange: number) => {
    const updatedItem = { ...item, quantity: item.quantity + amountChange }
    if (updatedItem.quantity < 1) return
    const updatedItems = order.items.map(i => i.id === updatedItem.id ? updatedItem : i)
    const updatedOrder = { ...order, items: updatedItems }
    setOrders(orders => orders.map(o => o.id === order.id ? updatedOrder : o))
  }

  const handlePaymentOption = (option: PaymentOptions) => {
    setPaymentOption(option)
  }

  const handleDeliveryOption = (option: DeliveryOptions, deliveryNote?: string) => {
    setDeliveryOption(option)
    if (deliveryNote) setDeliveryNote(deliveryNote)
  }

  const handlePlaceOrder = async () => {
    if (!order) return
    if (!order.user) {
      toast.show('Please add your name', { type: 'warning' })
      return
    }

    order.date = new Date()
    order.total = cartTotal
    order.payment = paymentOption
    order.delivery = deliveryOption
    order.user = user
    if (deliveryNote) order.delivery = deliveryNote
    const html = generateOrderHTML(order)
    const { uri } = await printToFileAsync({ html })

    try {
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' })
    } catch (error) {
      toast.show('Failed to share order...', { type: 'danger' })
    }
    await FileSystem.deleteAsync(uri)
    router.push('/')
  }

  const handleUser = (user: string) => {
    if (order && user) setUser(user)
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={order.items}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <SelectedItemListView
            item={item}
            onRemove={() => handleRemoveItem(item)}
            onAddToCart={() => handleAddToCart(item)}
            onAmountChange={(newAmount) => handleItemAmountChange(item, newAmount - item.quantity)} />}
        ListFooterComponent={
          <>
            {cartTotal > 0 && <OptionsPaymentView order={order} onPaymentOptionChange={handlePaymentOption} />}
            {cartTotal > 0 && <OptionsDeliveryView order={order} onDeliveryOptionChange={handleDeliveryOption} />}
            {cartTotal > 0 && <OrderUsernameInput user={user} onUserChange={handleUser} />}
            {cartTotal > 0 && <SelectedItemsTotal total={cartTotal} />}
            <View style={styles.actions}>
              {cartTotal > 0 &&
                <Pressable
                  onPress={handlePlaceOrder}
                  text='Place order'
                  icon={<Ionicons name="share-social-outline" size={20} />}
                />}
            </View>
          </>
        }
        ListEmptyComponent={<EmptyView />}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.white,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
})
