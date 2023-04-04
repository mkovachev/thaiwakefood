import { Order } from '../data/Order'
import { formatOrderDatePdf } from './formatOrderDatePdf'

export const parsePdfUri = (uri: string, order: Order) =>
  `${uri.slice(0, uri.lastIndexOf('/') + 1)}Order_${order.id}_${order.user}_${formatOrderDatePdf(order.date)}.pdf`
