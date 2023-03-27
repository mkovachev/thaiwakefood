import { StyleSheet } from 'react-native'
import { Order } from '../data/Order'
import colors from '../ui/colors'
import Link from '../ui/components/Link'
import { View, Text } from '../ui/components/Themed'
import { formatInTHB } from '../utils/formatInTHB'

interface Props {
  order: Order
}

export const OrderListView = ({ order: item }: Props) => {

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Text>Order: {item.id}</Text>
        <Text>Status: {item.status}</Text>
        <Text>Total: {formatInTHB(item.total)}</Text>
        <Link style={styles.link} href={`orders/${item.id}`} text='show details' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    borderBottomColor: colors.blue,
    borderBottomWidth: .1,
  },
  details: {
    gap: 8
  },
  link: {
    alignSelf: 'flex-end',
  },
})