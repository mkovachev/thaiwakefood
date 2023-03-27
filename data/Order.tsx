import { CartItem } from './CartItem'
import { OrderStatus } from './OrderStatus'

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: OrderStatus
}