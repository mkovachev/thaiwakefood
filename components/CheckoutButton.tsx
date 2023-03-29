import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../ui/colors'
import { Text, View } from '../ui/components/Themed'
import fontFamily from '../ui/fontFamily'


interface Props {
  onCheckout: () => void
}

export const CheckoutButton = ({ onCheckout }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
        <Text style={styles.checkoutText}>Checkout</Text>
        <MaterialCommunityIcons name="share-variant-outline" size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
  checkoutButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.yellow,
    padding: 10,
    margin: 10,
    borderRadius: 20,
    gap: 8
  },
  checkoutText: {
    fontFamily: fontFamily.MontserratMedium,
    color: colors.white,
  },
})