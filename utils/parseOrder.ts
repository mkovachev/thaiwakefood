import { Order } from '../data/Order'

export const parseOrderForSharing = (order: Order) => {
  const formattedItems = order.items.map((item) => {
    const itemDetails = `${item.amount} x ${item.title} (${item.price.toFixed(2)} each)`
    return `${itemDetails}\n`
  }).join('')

  const formattedTotal = `Total: $${order.total.toFixed(2)}`

  const formattedOrder = `Order #${order.id}\n\nItems:\n${formattedItems}\n${formattedTotal}`

  return formattedOrder
}
