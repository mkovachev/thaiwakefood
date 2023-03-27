import { OrderStatus } from './OrderStatus'

export interface Order {
  id: number
  total: number
  status: OrderStatus
}