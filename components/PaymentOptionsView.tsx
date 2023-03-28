import { useState } from 'react'
import { RadioButton } from 'react-native-paper'
import { PaymentOptions } from '../data/PaymentOptions'
import { View, Text } from '../ui/components/Themed'
import { StyleSheet } from 'react-native'

interface Props {
  onPaymentOption: (option: PaymentOptions) => void
}

export const PaymentOptionsView = ({ onPaymentOption }: Props) => {
  const [paymentOption, setPaymentOption] = useState(PaymentOptions.Cash)

  const handlePaymentOptionChange = (option: PaymentOptions) => {
    setPaymentOption(option)
    onPaymentOption(option)
  }

  return (
    <View style={styles.paymentOptionsContainer}>
      {Object.values(PaymentOptions).map((option) => (
        <View key={option} style={styles.paymentOptionRow}>
          <RadioButton
            value={option}
            status={paymentOption === option ? 'checked' : 'unchecked'}
            onPress={() => handlePaymentOptionChange(option)}
          />
          <Text style={styles.paymentOptionText}>{option}</Text>
        </View>
      ))}
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
  },
})
