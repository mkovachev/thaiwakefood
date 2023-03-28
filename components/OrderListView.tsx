import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { Pressable, StyleSheet } from 'react-native'
import { Order } from '../data/Order'
import colors from '../ui/colors'
import { View, Text } from '../ui/components/Themed'
import { formatInTHB } from '../utils/formatInTHB'

interface Props {
  order: Order
  onRemove: () => void
}

export const OrderListView = ({ order, onRemove }: Props) => {

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Text>Order: {order.id}</Text>
        <Text>Status: {order.status}</Text>
        <Text>Total: {formatInTHB(order.total)}</Text>
      </View>
      <View style={styles.actions}>
        <Pressable onPress={onRemove} style={{ alignSelf: 'flex-end' }}>
          <MaterialIcons name="highlight-remove" size={24} color={colors.red} />
        </Pressable>
        <Link href={`orders/${order.id}`}>
          <MaterialCommunityIcons name="table-search" size={24} color={colors.blue} />
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    borderBottomColor: colors.blue,
    borderBottomWidth: .1,
  },
  details: {
    gap: 8
  },
  actions: {
    gap: 10
  },
})