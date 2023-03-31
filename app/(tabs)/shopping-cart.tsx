import { StyleSheet, FlatList } from 'react-native'
import { CartItem } from '../../data/CartItem'
import { View } from '../../ui/components/Themed'
import { SelectedItemListView } from '../../components/SelectedItemListView'
import { SelectedItemsTotal } from '../../components/SelectedItemsTotal'
import { EmptyView } from '../../components/EmptyView'
import { useRecoilState } from 'recoil'
import { cartAtom, ordersAtom } from '../../context/recoil'
import { useToast } from 'react-native-toast-notifications'
import { PlaceOrderButton as PlaceOrderButton } from '../../components/PlaceOrderButton'
import { shareAsync } from 'expo-sharing'
import { printToFileAsync } from 'expo-print'
import * as FileSystem from 'expo-file-system'
import { generateOrderHTML } from '../../utils/generateOrderHTML'
import { useState } from 'react'
import { PaymentOptions } from '../../data/PaymentOptions'
import { DeliveryOptions } from '../../data/DeliveryOptions'
import { OptionsPaymentView } from '../../components/OptionsPaymentView'
import { OptionsDeliveryView } from '../../components/OptionsDeliveryView'
import { useRouter } from 'expo-router'
import { SaveOrderButton } from '../../components/SaveOrderButton'
import { parseOrder } from '../../utils/parseOrder'


export default function ShoppingCartScreen() {
  const router = useRouter()
  const toast = useToast()
  const [cartItems, setCartItems] = useRecoilState(cartAtom)
  const [orders, setOrders] = useRecoilState(ordersAtom)
  const [paymentOption, setPaymentOption] = useState(PaymentOptions.Cash)
  const [deliveryOption, setDeliveryOption] = useState(DeliveryOptions.Pickup)
  const [deliveryNote, setDeliveryNote] = useState('')

  const cartTotal = cartItems.length > 0 ? cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0) : 0

  const handleRemoveItem = (item: CartItem) => {
    const updatedItems = cartItems.filter(i => i.id !== item.id)
    setCartItems(updatedItems)
    toast.show(`${item.name} removed successfully`, { type: 'danger' })
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

  const handlePlaceOrder = async () => {
    const order = parseOrder(orders, cartItems, cartTotal, paymentOption, deliveryOption, deliveryNote)
    const html = generateOrderHTML(order)
    const { uri } = await printToFileAsync({ html })

    try {
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' })
    } catch (error) {
      toast.show('Failed to share order...', { type: 'danger' })
    }
    await FileSystem.deleteAsync(uri)
    //setCartItems([]) //TODO: maybe not needed
    router.push('/')
  }

  const handleSaveOrder = () => {
    const order = parseOrder(orders, cartItems, cartTotal, paymentOption, deliveryOption, deliveryNote)
    setOrders(orders => [...orders, order])
    toast.show('Your order has been saved successfully', { type: 'success' })
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => `${item.id}${item.option}`}
        renderItem={({ item }) =>
          <SelectedItemListView
            item={item}
            inCart={true}
            onRemove={() => handleRemoveItem(item)}
            onAmountChange={(newAmount) => handleItemAmountChange(item, newAmount - item.quantity)}
          />}
        ListFooterComponent={
          <>
            {cartTotal > 0 && <OptionsPaymentView onPaymentOptionChange={handlePaymentOption} />}
            {cartTotal > 0 && <OptionsDeliveryView onDeliveryOptionChange={handleDeliveryOption} />}
            {cartTotal > 0 && <SelectedItemsTotal total={cartTotal} />}
            <View style={styles.actions}>
              {cartTotal > 0 && <PlaceOrderButton onPlaceOrder={handlePlaceOrder} />}
              {cartTotal > 0 && <SaveOrderButton onSave={handleSaveOrder} />}
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
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
})
