import { Link } from 'expo-router'
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
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //display: 'flex',
    alignItems: 'flex-end',
  },
  checkoutButton: {
    backgroundColor: colors.yellow,
    padding: 10,
    margin: 10,
    borderRadius: 20,
  },
  checkoutText: {
    fontFamily: fontFamily.MontserratMedium,
    color: colors.white,
  },
})