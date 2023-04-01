import { Order } from '../data/Order'
import { formatOrderDate } from './formatOrderDate'

export const parsePdfUri = (uri: string, order: Order) =>
  `${uri.slice(0, uri.lastIndexOf('/') + 1)}Order_${order.id}_${order.user}_${formatOrderDate(order.date)}.pdf`
