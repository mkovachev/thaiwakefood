import { PAYMENT_URL } from '@env'

export const getPaymentClientSecret = async () => {
  const response = await fetch(`${PAYMENT_URL}/create-payment-intent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      currency: 'usd',
      items: [{ id: 'id' }],
    }),
  })
  const { clientSecret } = await response.json()
  return clientSecret
}