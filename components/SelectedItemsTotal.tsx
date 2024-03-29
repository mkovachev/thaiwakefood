import fontFamily from '../ui/fontFamily'
import { formatInTHB } from '../utils/formatInTHB'
import { View, Text } from '../ui/components/Themed'
import { StyleSheet } from 'react-native'

interface Props {
  total: number
}

export const SelectedItemsTotal = ({ total }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.totalText}>Total price: {formatInTHB(total)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    alignItems: 'flex-end',
  },
  totalText: {
    fontFamily: fontFamily.MontserratMedium,
  }
})
