import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import { Order } from '../data/Order'
import colors from '../ui/colors'
import { View, Text } from '../ui/components/Themed'
import { formatInTHB } from '../utils/formatInTHB'
import Pressable from '../ui/components/Pressable'

interface Props {
  order: Order
  onRemove: () => void
}

export const OrderListView = ({ order, onRemove }: Props) => {

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Text>Order: {order.id}</Text>
        <Text>Total: {formatInTHB(order.total)}</Text>
      </View>
      <View style={styles.actions}>
        <Pressable
          style={{ alignSelf: 'flex-end' }}
          onPress={onRemove}
          icon={<MaterialIcons name="highlight-remove" size={24} color={colors.red} />}
        />
        <Pressable
          url={`my-orders/${order.id}`}
          icon={<MaterialCommunityIcons name="table-search" size={24} />}
        />
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
    borderBottomColor: colors.blueLight,
    borderBottomWidth: .1,
  },
  details: {
    gap: 8
  },
  actions: {
    gap: 10
  },
})