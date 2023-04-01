import { CartItem } from '../data/CartItem'
import { DeliveryOptions } from '../data/DeliveryOptions'
import { Order } from '../data/Order'
import { PaymentOptions } from '../data/PaymentOptions'


export const parseOrder = (user: string, orders: Order[], cartItems: CartItem[], cartTotal: number, paymentOption: PaymentOptions, deliveryOption: DeliveryOptions, deliveryNote: string) => {
  let id = 1
  if (orders.length > 0) id = Number(orders[orders.length - 1].id) + 1

  const order: Order = {
    id: id.toString(),
    total: cartTotal,
    items: cartItems,
    date: new Date(),
    payment: paymentOption,
    delivery: deliveryOption,
    deliveryNote: deliveryNote,
    user: user
  }

  return order
}
