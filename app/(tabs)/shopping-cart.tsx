import { StyleSheet, FlatList, Platform } from 'react-native'
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
import { shareAsync } from 'expo-sharing'
import { printToFileAsync } from 'expo-print'
import * as FileSystem from 'expo-file-system'
import { generateOrderHTML } from '../../utils/generateOrderHTML'
import { useState } from 'react'
import { PaymentOptions } from '../../data/PaymentOptions'
import { DeliveryOptions } from '../../data/DeliveryOptions'
import { PaymentOptionsView } from '../../components/PaymentOptionsView'
import { DeliveryOptionsView } from '../../components/DeliveryOptionsView'


export default function ShoppingCartScreen() {
  const toast = useToast()
  const [cartItems, setCartItems] = useRecoilState(cartAtom)
  const [orders, setOrders] = useRecoilState(ordersAtom)
  const [paymentOption, setPaymentOption] = useState(PaymentOptions.Cash)
  const [deliveryOption, setDeliveryOption] = useState(DeliveryOptions.Pickup)

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

  const handleCheckout = async () => {
    let id = 1
    if (orders.length > 0) id = Number(orders[orders.length - 1].id) + 1

    const order: Order = {
      id: id.toString(),
      total: cartTotal,
      items: cartItems,
      date: new Date(),
      payment: paymentOption,
      delivery: deliveryOption
    }

    const html = generateOrderHTML(order)
    const { uri } = await printToFileAsync({ html })

    try {
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' })
      setOrders(orders => [...orders, order])
      setCartItems([])
    } catch (error) {
      console.log(error)
      toast.show('Failed to share order...', { type: 'danger' })
    }
    await FileSystem.deleteAsync(uri)
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
            {cartTotal > 0 && <PaymentOptionsView />}
            {cartTotal > 0 && <DeliveryOptionsView />}
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
