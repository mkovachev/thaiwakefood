import { useState } from 'react'
import { RadioButton } from 'react-native-paper'
import { PaymentOptions } from '../data/PaymentOptions'
import { View, Text } from '../ui/components/Themed'
import { StyleSheet } from 'react-native'
import colors from '../ui/colors'
import { Order } from '../data/Order'

interface Props {
  order?: Order
  onPaymentOptionChange: (option: PaymentOptions) => void
}

export const OptionsPaymentView = ({ order, onPaymentOptionChange }: Props) => {
  const [selectedOption, setSelectedOption] = useState(order?.payment || PaymentOptions.Cash)

  const handlePaymentOptionChange = (option: PaymentOptions) => {
    setSelectedOption(option)
    onPaymentOptionChange(option)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Options:</Text>
      {Object.values(PaymentOptions).map((option) => (
        <View key={option} style={styles.paymentOption}>
          <RadioButton
            value={option}
            color={colors.yellow}
            uncheckedColor={colors.blueLight}
            status={selectedOption === option ? 'checked' : 'unchecked'}
            onPress={() => handlePaymentOptionChange(option)}
          />
          <Text style={styles.paymentOptionText}>{option}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  title: {
    marginVertical: 5
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentOptionText: {
  },
})
