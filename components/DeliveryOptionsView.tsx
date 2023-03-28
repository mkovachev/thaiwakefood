import { useState } from 'react'
import { RadioButton } from 'react-native-paper'
import { DeliveryOptions } from '../data/DeliveryOptions'
import { View, Text } from '../ui/components/Themed'
import { StyleSheet } from 'react-native'
import colors from '../ui/colors'

interface Props {
  onDeliveryOption: (option: DeliveryOptions) => void
}

export const DeliveryOptionsView = ({ onDeliveryOption }: Props) => {
  const [selectedOption, setSelectedOption] = useState(DeliveryOptions.Pickup)

  const deliveryOptionItems = Object.values(DeliveryOptions).map((option) => (
    <View style={styles.deliveryOptionRow} key={option}>
      <RadioButton
        value={option}
        status={option === selectedOption ? 'checked' : 'unchecked'}
        onPress={() => {
          setSelectedOption(option)
          onDeliveryOption(option)
        }}
      />
      <Text style={styles.deliveryOptionText}>{option}</Text>
    </View>
  ))

  return (
    <View style={styles.deliveryOptionsContainer}>
      {deliveryOptionItems}
    </View>
  )
}

const styles = StyleSheet.create({
  deliveryOptionsContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderRadius: 5,
  },
  deliveryOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  deliveryOptionText: {
    marginLeft: 10,
    fontSize: 16,
  },
})
