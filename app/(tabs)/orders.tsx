import { FlatList, StyleSheet } from 'react-native'
import { View } from '../../ui/components/Themed'
import { EmptyView } from '../../components/EmptyView'
import { useRecoilState } from 'recoil'
import { ordersAtom } from '../../context/recoil'
import { OrderListView } from '../../components/OrderListView'


export default function OrdersScreen() {
  const [items, setItems] = useRecoilState(ordersAtom)

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <OrderListView order={item} />}
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
