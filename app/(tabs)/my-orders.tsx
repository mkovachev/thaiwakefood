import { FlatList, StyleSheet } from 'react-native'
import { View } from '../../ui/components/Themed'
import { EmptyView } from '../../components/EmptyView'
import { useRecoilState } from 'recoil'
import { ordersAtom } from '../../context/recoil'
import { OrderListView } from '../../components/OrderListView'
import { Order } from '../../data/Order'
import { useToast } from 'react-native-toast-notifications'


export default function MyOrdersScreen() {
  const toast = useToast()
  const [orders, setOrders] = useRecoilState(ordersAtom)

  const handleRemove = (order: Order) => {
    const filteredItems = orders.filter(i => i.id !== order.id)
    setOrders(filteredItems)
    toast.show(`Order ${order.id} removed`, { type: 'danger' })
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={order => order.id}
        renderItem={({ item }) =>
          <OrderListView
            order={item}
            onRemove={() => handleRemove(item)}
          />}
        ListEmptyComponent={<EmptyView />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
