import { StyleSheet, FlatList } from 'react-native'
import { CartItem } from '../../data/CartItem'
import { View } from '../../ui/components/Themed'
import { SelectedItemListView } from '../../components/SelectedItemListView'
import { SelectedItemsTotal } from '../../components/SelectedItemsTotal'
import { EmptyView } from '../../components/EmptyView'
import { useRecoilState } from 'recoil'
import { cartAtom, ordersAtom } from '../../context/recoil'
import { useToast } from 'react-native-toast-notifications'
import { shareAsync } from 'expo-sharing'
import { printToFileAsync } from 'expo-print'
import * as FileSystem from 'expo-file-system'
import { generateOrderHTML } from '../../utils/generateOrderHTML'
import { useEffect, useState } from 'react'
import { PaymentOptions } from '../../data/PaymentOptions'
import { DeliveryOptions } from '../../data/DeliveryOptions'
import { OptionsDeliveryView } from '../../components/OptionsDeliveryView'
import { useRouter } from 'expo-router'
import { parseOrder } from '../../utils/parseOrder'
import Pressable from '../../ui/components/Pressable'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { OrderUsernameInput } from '../../components/OrderUsernameInput'
import { Order } from '../../data/Order'
import { parsePdfUri } from '../../utils/parsePdfUri'
import { OptionsPaymentView } from '../../components/OptionsPaymentView'


export default function ShoppingCartScreen() {
  const router = useRouter()
  const toast = useToast()
  const [cartItems, setCartItems] = useRecoilState(cartAtom)
  const [orders, setOrders] = useRecoilState(ordersAtom)
  const [order, setOrder] = useState<Order>()
  const [paymentOption, setPaymentOption] = useState(PaymentOptions.Cash)
  const [deliveryOption, setDeliveryOption] = useState(DeliveryOptions.Pickup)
  const [deliveryNote, setDeliveryNote] = useState('')
  const [user, setUser] = useState('')

  const cartTotal = cartItems.length > 0 ? cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0) : 0

  useEffect(() => {
    if (orders && cartItems && cartTotal && paymentOption && deliveryOption) {
      setOrder(parseOrder(user, orders, cartItems, cartTotal, paymentOption, deliveryOption, deliveryNote))
    }
  }, [user, orders, cartItems, cartTotal, paymentOption, deliveryOption, deliveryNote])

  const handleRemoveItem = (item: CartItem) => {
    const updatedItems = cartItems.filter(i => i.id !== item.id)
    setCartItems(updatedItems)
    toast.show(`${item.name} removed`, { type: 'danger' })
    if (cartItems.length === 1) {
      toast.show(`${item.name} removed`, { type: 'danger' })
      toast.show('Your cart is now empty', { type: 'danger' })
    } else {
      toast.show(`${item.name} removed`, { type: 'danger' })
    }
  }

  const handleItemAmountChange = (item: CartItem, amountChange: number) => {
    const updatedItem = { ...item, quantity: item.quantity + amountChange }
    if (updatedItem.quantity < 1) return
    setCartItems(items => items.map(i => i.id === updatedItem.id ? updatedItem : i))
  }

  const handlePaymentOption = (option: PaymentOptions) => {
    setPaymentOption(option)
  }

  const handleDeliveryOption = (option: DeliveryOptions, deliveryNote?: string) => {
    setDeliveryOption(option)
    if (deliveryNote) setDeliveryNote(deliveryNote)
  }

  const handleUser = (user: string) => {
    if (order && user) setUser(user)
  }

  const handlePlaceOrder = async () => {
    if (!order) return
    if (!order.user) {
      toast.show('Please add your name', { type: 'warning' })
      return
    }

    const html = generateOrderHTML(order)
    const { uri } = await printToFileAsync({ html })
    const pdfUri = parsePdfUri(uri, order)
    await FileSystem.moveAsync({ from: uri, to: pdfUri })

    try {
      await shareAsync(pdfUri, { UTI: '.pdf', mimeType: 'application/pdf', dialogTitle: 'Share your order' })
    } catch (error) {
      toast.show('Failed to share order...', { type: 'danger' })
    }

    if (uri) await FileSystem.deleteAsync(uri)

    setOrders(orders => [...orders, order])
    setCartItems([])
    router.push('/')
    toast.show('Your order has been saved in my orders', { type: 'success' })
  }

  const handleSaveOrder = async () => {
    if (!order) return
    if (!order.user) {
      toast.show('Please add your name', { type: 'warning' })
      return
    }

    setOrders(orders => [...orders, order])
    setCartItems([])
    router.push('/')
    toast.show('Your order has been saved in my orders', { type: 'success' })
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => `${item.id}${item.option}`}
        renderItem={({ item }) =>
          <SelectedItemListView
            item={item}
            onRemove={() => handleRemoveItem(item)}
            onAmountChange={(newAmount) => handleItemAmountChange(item, newAmount - item.quantity)}
          />}
        ListFooterComponent={
          <>
            {cartTotal > 0 && <OptionsPaymentView onPaymentOptionChange={handlePaymentOption} />}
            {cartTotal > 0 && <OptionsDeliveryView onDeliveryOptionChange={handleDeliveryOption} />}
            {cartTotal > 0 && <OrderUsernameInput user={user} onUserChange={handleUser} />}
            {cartTotal > 0 && <SelectedItemsTotal total={cartTotal} />}
            <View style={styles.actions}>
              {cartTotal > 0 &&
                <Pressable
                  onPress={handlePlaceOrder}
                  text='Place order'
                  icon={<Ionicons name="share-social-outline" size={20} />}
                />}
              {cartTotal > 0 &&
                <Pressable
                  onPress={handleSaveOrder}
                  text='Save'
                  icon={<AntDesign name="save" size={20} />}
                />}
            </View>
          </>
        }
        ListEmptyComponent={<EmptyView />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
})
