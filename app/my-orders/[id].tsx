import { View } from '../../ui/components/Themed'
import { Stack, useSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import NotFoundScreen from '../[...missing]'
import { ordersAtom } from '../../context/recoil'
import { useRecoilValueLoadable } from 'recoil'
import { Order } from '../../data/Order'
import OrderDetailsView from '../../components/OrderDetailsView'
import { StyleSheet } from 'react-native'


const OrderDetailsScreen = () => {
  const { id } = useSearchParams()
  const [order, setOrder] = useState<Order>()
  const orders = useRecoilValueLoadable(ordersAtom)

  useEffect(() => {
    if (orders.state === 'hasValue') {
      const foundOrder = orders.contents.find(order => order.id === id)
      if (foundOrder) {
        setOrder(foundOrder)
      }
    }
  }, [id, orders])

  if (orders.state === 'loading') {
    return <View>Loading...</View>
  }

  if (!order) {
    return <NotFoundScreen />
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: `#${order.id}`,
          presentation: 'modal',
          headerShown: true,
        }}
      />
      <View>
        <OrderDetailsView order={order} />
      </View>
    </View>
  )
}

export default OrderDetailsScreen


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
