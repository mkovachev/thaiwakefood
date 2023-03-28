import { useState } from 'react'
import { RadioButton } from 'react-native-paper'
import { DeliveryOptions } from '../data/DeliveryOptions'
import { View, Text } from '../ui/components/Themed'
import { StyleSheet } from 'react-native'


export const DeliveryOptionsView = () => {
  const [deliveryOption, setDeliveryOption] = useState<string | null>(null)

  return (
    <View style={styles.deliveryOptionsContainer}>
      <View style={styles.deliveryOptionRow}>
        <RadioButton
          value={DeliveryOptions.Pickup}
          status={deliveryOption === DeliveryOptions.Pickup ? 'checked' : 'unchecked'}
          onPress={() => setDeliveryOption(DeliveryOptions.Pickup)}
        />
        <Text style={styles.deliveryOptionText}>Pickup</Text>
      </View>
      <View style={styles.deliveryOptionRow}>
        <RadioButton
          value={DeliveryOptions.Delivery}
          status={deliveryOption === DeliveryOptions.Delivery ? 'checked' : 'unchecked'}
          onPress={() => setDeliveryOption(DeliveryOptions.Delivery)}
        />
        <Text style={styles.deliveryOptionText}>Delivery</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  deliveryOptionsContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
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
