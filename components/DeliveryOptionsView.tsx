import { useState } from 'react'
import { Divider, RadioButton, TextInput } from 'react-native-paper'
import { DeliveryOptions } from '../data/DeliveryOptions'
import { View, Text } from '../ui/components/Themed'
import { StyleSheet } from 'react-native'
import colors from '../ui/colors'

interface Props {
  onDeliveryOptionChange: (option: DeliveryOptions, deliveryNote?: string) => void
}

export const DeliveryOptionsView = ({ onDeliveryOptionChange }: Props) => {
  const [selectedOption, setSelectedOption] = useState(DeliveryOptions.Pickup)
  const [deliveryNote, setDeliveryNote] = useState('')
  
  const handleDeliveryOptionChange = (option: DeliveryOptions) => {
    setSelectedOption(option)
    if (option === DeliveryOptions.Delivery) {
      onDeliveryOptionChange(option, deliveryNote)
    } else {
      onDeliveryOptionChange(option)
    }
  }

  const handleDeliveryNoteChange = (text: string) => {
    setDeliveryNote(text)
    if (selectedOption === DeliveryOptions.Delivery) {
      onDeliveryOptionChange(selectedOption, text)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery Options:</Text>
      {Object.values(DeliveryOptions).map((option) => (
        <View style={styles.deliveryOption} key={option}>
          <RadioButton
            value={option}
            color={colors.yellow}
            uncheckedColor={colors.blue}
            status={option === selectedOption ? 'checked' : 'unchecked'}
            onPress={() => handleDeliveryOptionChange(option)}
          />
          <Text>{option}</Text>
        </View>
      ))}
      {selectedOption === DeliveryOptions.Delivery &&
        <TextInput
          style={styles.deliveryNote}
          label='Add delivery note...'
          placeholder='room number...'
          value={deliveryNote}
          numberOfLines={2}
          maxLength={80}
        onChangeText={handleDeliveryNoteChange}
          cursorColor={colors.yellow}
          underlineColor={colors.yellow}
          activeUnderlineColor={colors.yellow}
          placeholderTextColor={colors.blue}
        />
      }
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
  deliveryOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryNote: {
    backgroundColor: colors.transparent,
    color: colors.yellow
  },
})