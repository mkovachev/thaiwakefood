import { Order } from '../data/Order'
import { StyleSheet, Image } from 'react-native'

export const generateOrderHTML = (order: Order) => {
const itemsHTML = order.items
.map(
item =>
`<li style="list-style: circle; margin-left: 20px; margin-top: 10px;">
  <strong>${item.name}:</strong> ${item.quantity} x ${item.price.toFixed(
  2
  )} THB
</li>`
)
.join('')

const html = `
<html>

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Order Confirmation</title>
  <style>
    body {
      background-color: white;
      text-align: center;
      color: black;
      font-family: Arial, Helvetica, sans-serif;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      background-color: #F5CA48;
    }

    .header img {
      height: 80px;
      margin-right: 1rem;
    }

    .header h1 {
      font-size: 2rem;
      margin: 0;
      color: white;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      text-align: left;
    }

    li {
      margin-bottom: 5px;
    }

    .separator {
      margin: 10px 0;
      border-bottom: 1px solid #696969;
    }

    h3 {
      color: #2F95DC;
    }

    .total {
      font-size: 24px;
      margin-top: 20px;
      color: #2F95DC;
    }

    .delivery-note {
      font-style: italic;
      margin-top: 10px;
      color: #F26C68;
    }

    .info {
      color: #2F95DC;
      text-align: center;
      margin-top: 20px;
    }

    .signature {
      color: #2F95DC;
      text-align: center;
    }
  </style>
</head>

<body>
  <div class="header">
    <img src="../assets/images/logo.png" alt="" />
    <h1>THAI WAKE PARK - TWP Lumlukka</h1>
  </div>

  <h3>Thank you for your order</h3>
  <h3><strong>Order #</strong> ${order.id}</h3>
  <ul>
    <li><strong>Order date:</strong> ${order.date.toDateString()}</li>
    <li><strong>Payment method:</strong> ${order.payment}</li>
    <li><strong>Delivery method:</strong> ${order.delivery}</li>
    <li><strong>Order items:</strong></li>
    <ul>
      ${itemsHTML}
    </ul>
    ${order.deliveryNote !== '' ? `<li class="delivery-note"><strong>Delivery Note:</strong> ${order.deliveryNote}</li>`
    : ''}
    <div class="separator"></div>
    <li class="total"><strong>Total: ${order.total.toFixed(2)} THB </strong></li>
    <h3 class="info">We will text you once your order is ready,</h3>
    <h3 class="signature">Your lovely THAI WAKE PARK</h3>
  </ul>
</body>

</html>
`

return html
}