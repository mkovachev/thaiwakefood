import fontFamily from '../ui/fontFamily'
import { formatInTHB } from '../utils/formatInTHB'
import { View, Text } from '../ui/components/Themed'
import { StyleSheet } from 'react-native'


export const CartTotal = (total: number) => {
  if (total > 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.totalText}>Total price: {formatInTHB(total)}</Text>
      </View>
    )
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: 'flex-end',
  },
  totalText: {
    fontFamily: fontFamily.MontserratMedium,
    fontSize: 16,
  }
})
