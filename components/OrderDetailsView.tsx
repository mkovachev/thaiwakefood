import { StyleSheet, FlatList } from 'react-native'
import { View, Text } from '../ui/components/Themed'
import { EmptyView } from '../components/EmptyView'
import { CartTotal } from './CartTotal'
import { Order } from '../data/Order'
import { OrderItemDetailsView } from './OrderItemDetailsView'
import colors from '../ui/colors'

interface Props {
  order: Order
}

export default function OrderDetailsView({ order }: Props) {

  return (
    <View style={styles.container}>
      <FlatList
        data={order.items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <OrderItemDetailsView item={item} />}
        ListFooterComponent={
          <>
            <Text style={styles.status}>Status: {order.status}</Text>
            <CartTotal total={order.total} />
          </>
        }
        ListEmptyComponent={<EmptyView />}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.white,
  },
  status: {
    margin: 10
  }
})
