import { RadioButton } from 'react-native-paper'
import { PaymentOptions } from '../data/PaymentOptions'
import { View, Text } from '../ui/components/Themed'
import { StyleSheet } from 'react-native'
import { useState } from 'react'


export const PaymentOptionsView = () => {
  const [paymentOption, setPaymentOption] = useState<string | null>(null)

  return (
    <View style={styles.paymentOptionsContainer}>
      <View style={styles.paymentOptionRow}>
        <RadioButton
          value={PaymentOptions.Cash}
          status={paymentOption === PaymentOptions.Cash ? 'checked' : 'unchecked'}
          onPress={() => setPaymentOption(PaymentOptions.Cash)}
        />
        <Text style={styles.paymentOptionText}>Cash on delivery</Text>
      </View>
      <View style={styles.paymentOptionRow}>
        <RadioButton
          value={PaymentOptions.Card}
          status={paymentOption === PaymentOptions.Card ? 'checked' : 'unchecked'}
          onPress={() => setPaymentOption(PaymentOptions.Card)}
        />
        <Text style={styles.paymentOptionText}>Credit / Debit card</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  paymentOptionsContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  paymentOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  paymentOptionText: {
    marginLeft: 10,
    fontSize: 16,
  }
})