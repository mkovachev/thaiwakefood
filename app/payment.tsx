import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { BillingDetails, CardField, useConfirmPayment } from '@stripe/stripe-react-native'
import colors from '../ui/colors'
import { View, Text } from "../ui/components/Themed"
import { getPaymentClientSecret } from '../utils/getPaymentClientSecret'
import { useToast } from 'react-native-toast-notifications'
import fontFamily from '../ui/fontFamily'


interface Props {
  amount: number
}

export default function PaymentScreen({ amount }: Props) {
  const { confirmPayment, loading } = useConfirmPayment()
  const [cardDetails, setCardDetails] = useState()

  const handleCardDetails = (cardDetails: any) => {
    setCardDetails(cardDetails)
    console.log(cardDetails)
  }

  const handlePayment = async () => {
    const toast = useToast()
    const clientSecret = await getPaymentClientSecret()
    const billingDetails: BillingDetails = {
      email: 'examplen@example.com',
    }

    try {
      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails,
        }
      })

      if (error) {
        toast.show(`Payment confirmation error: ${error.message}`, { type: 'danger'})
        return false
      }

      if (paymentIntent?.status === 'Succeeded') {
        toast.show(`Payment succeeded with ID: ${paymentIntent.id}`, { type: 'success' })
        return true
      } else {
        toast.show(`Payment failed with status: ${paymentIntent?.status}`, { type: 'danger' })
        return false
      }
    } catch (error: any) {
      toast.show(`Payment confirmation error: ${error.message}`, { type: 'danger' })
      return false
    }
  }


  return (
    <View style={styles.container}>
      <CardField
        style={styles.cardField}
        postalCodeEnabled={false}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        onCardChange={handleCardDetails}
        onFocus={(focusedField) => {
          console.log('focusField', focusedField)
        }}
      />
      <Text style={styles.pay} onPress={handlePayment} disabled={loading}>Pay</Text>
      {/* <TouchableOpacity style={styles.pay} onPress={handlePayment}> */}
        {/* <Text style={styles.payText}>Pay</Text> */}
      {/* </TouchableOpacity> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 30,
  },
  pay: {
    fontFamily: fontFamily.MontserratSemiBold,
    width: '30%',
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: colors.blue,
    color: colors.white,
    borderRadius: 16,
    padding: 10
  },
})
