import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../ui/colors'
import { Text, View } from '../ui/components/Themed'
import fontFamily from '../ui/fontFamily'


interface Props {
  onPlaceOrder: () => void
}

export const PlaceOrderButton = ({ onPlaceOrder }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.placeOrderButton} onPress={onPlaceOrder}>
        <MaterialCommunityIcons name="share-variant-outline" size={20} color={colors.white} />
        <Text style={styles.placeOrderText}>Place order</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
  placeOrderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.yellow,
    padding: 10,
    margin: 5,
    borderRadius: 20,
    gap: 8
  },
  placeOrderText: {
    fontFamily: fontFamily.MontserratMedium,
    fontSize: 12,
    color: colors.white,
  },
})