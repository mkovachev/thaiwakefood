import { Order } from '../data/Order'
import { formatInTHB } from './formatInTHB'

export const generateOrderHTML = (order: Order) => {
  const logoUrl = 'https://drive.google.com/uc?id=1C3nCO1QKDUPLKHRWn01_YMOmt2oD_XyL'
  const menuImageUrl = 'https://drive.google.com/uc?id=1TNXZp3ItMEgDoWBwqO7_ftqAc_Ua63nn'

  const itemsHTML = order.items.map(item =>
    `<li style="list-style: none; display: flex; align-items: center; margin-top: 10px;">
      <img src=${menuImageUrl} style="width: 50px; height: 50px; margin-right: 10px;" />
      <div>
        <strong>${item.name} ${item?.option}:</strong> ${item.quantity} x ${formatInTHB(item.price.toFixed(2))}
      </div>
    </li>`)
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
      background-color: #609436;
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
      font-size: 28px;
      margin-bottom: 15px;
    }

    .separator {
      margin: 15px 0;
      border-bottom: 20px solid #609436;
    }

    p {
      font-size: 28px;
    }

    .total {
      font-size: 28px;
      margin-top: 20px;
      text-align: right;
    }

    .delivery-note {
      font-style: italic;
      margin-top: 28px;
      color: #F26C68;
    }

    .info {
      font-size: 28px;
      margin-top: 30;
      text-align: center;
    }

    .signature {
      font-size: 28px;
      text-align: center;
    }
  </style>
</head>

<body>
  <div class="header">
    <img src=${logoUrl} />
    <h1>THAI WAKE PARK - TWP Lumlukka</h1>
  </div>

  <p>Thank you for your order. You will find your order details below.</p>
  <p><strong>Order: ${order.id}, ${order.date.toDateString()}</strong></p>

  <div class="separator"></div>

  <ul>
    <li><strong>Order items:</strong></li>
    <ul>
    ${itemsHTML}
    </ul>
    <div class="separator"></div>
    <li class="total"><strong>Total: ${formatInTHB(order.total.toFixed(2))} </strong></li>
    
    <p class="info"Additional Information:</p>
    <li><strong>Payment method:</strong> ${order.payment}</li>
    <li><strong>Delivery method:</strong> ${order.delivery}</li>
    ${order.deliveryNote !== '' ? `<li class="delivery-note"><strong>Delivery Note:</strong>*** ${order.deliveryNote}</li>`
    : ''}
    </ul>
    
    <div class="separator"></div>

    <p class="info">We will text you once your order is ready,</p>
    <p class="signature">Your lovely THAI WAKE PARK</p>

</body>

</html>
`

  return html
}