import { Order } from '../data/Order'

export const generateOrderHTML = (order: Order) => {
  const itemsHTML = order.items.map(
    item =>
      `<li>${item.title}: ${item.price.toFixed(2)}</li>`
  ).join('')

  const html = `
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Order Confirmation</title>
        <style>
          body {
            font-family: sans-serif;
          }
          h1 {
            font-size: 1.5rem;
            margin-top: 0;
          }
          ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }
          li {
            margin-bottom: 0.5rem;
          }
          .total {
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <h1>Thank you for your order!</h1>
        <p>Your order has been received and will be processed shortly.</p>
        <h2>Order Details</h2>
        <ul>
          <li><strong>Order ID:</strong> ${order.id}</li>
          <li><strong>Order Date:</strong> ${order.date.toDateString()}</li>
          <li><strong>Payment Method:</strong> ${order.payment}</li>
          <li><strong>Delivery Method:</strong> ${order.delivery}</li>
          <li><strong>Order Items:</strong></li>
          <ul>
            ${itemsHTML}
          </ul>
          <li class="total"><strong>Order Total:</strong> ${order.total.toFixed(2)}</li>
        </ul>
      </body>
    </html>
  `

  return html
}