import colors from '../ui/colors'
import { StyleSheet, FlatList } from 'react-native'
import { View, Text } from '../ui/components/Themed'
import { EmptyView } from '../components/EmptyView'
import { CartTotal } from './CartTotal'
import { Order } from '../data/Order'
import { DeliveryOptionsView } from './DeliveryOptionsView'
import { PaymentOptionsView } from './PaymentOptionsView'
import { PlaceOrderButton } from './PlaceOrderButton'
import { useRouter } from 'expo-router'
import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'
import { useToast } from 'react-native-toast-notifications'
import { useRecoilState } from 'recoil'
import { ordersAtom } from '../context/recoil'
import { CartItem } from '../data/CartItem'
import { DeliveryOptions } from '../data/DeliveryOptions'
import { PaymentOptions } from '../data/PaymentOptions'
import { generateOrderHTML } from '../utils/generateOrderHTML'
import * as FileSystem from 'expo-file-system'
import { SelectedItem } from './SelectedItemListView'
import { useState } from 'react'


interface Props {
  order: Order
}

export default function OrderDetailsView({ order }: Props) {
  const router = useRouter()
  const toast = useToast()
  const [orders, setOrders] = useRecoilState(ordersAtom)
  const [paymentOption, setPaymentOption] = useState(order.payment)
  const [deliveryOption, setDeliveryOption] = useState(order.delivery)
  const [deliveryNote, setDeliveryNote] = useState(order.deliveryNote || '')

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
    toast.show(`${item.name} removed successfully`, { type: 'danger' })
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
    order.date = new Date()
    order.total = cartTotal
    order.payment = paymentOption
    order.delivery = deliveryOption
    if(deliveryNote) order.delivery = deliveryNote
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
  return (
    <View style={styles.container}>
      <FlatList
        data={order.items}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <SelectedItem
            item={item}
            onRemove={() => handleRemoveItem(item)}
            onAmountChange={(newAmount) => handleItemAmountChange(item, newAmount - item.quantity)} />}
        ListFooterComponent={
          <>
            {cartTotal > 0 && <PaymentOptionsView order={order} onPaymentOptionChange={handlePaymentOption} />}
            {cartTotal > 0 && <DeliveryOptionsView order={order} onDeliveryOptionChange={handleDeliveryOption} />}
            {cartTotal > 0 && <CartTotal total={cartTotal} />}
            <View style={styles.actions}>
              {cartTotal > 0 && <PlaceOrderButton onPlaceOrder={handlePlaceOrder} />}
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
