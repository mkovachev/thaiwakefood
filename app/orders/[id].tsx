import { View } from '../../ui/components/Themed'
import { Stack, useSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import NotFoundScreen from '../[...missing]'
import { ordersAtom } from '../../context/recoil'
import { useRecoilValueLoadable } from 'recoil'
import { Order } from '../../data/Order'
import OrderDetailsView from '../../components/OrderDetailsView'

const OrderDetailsScreen = () => {
  const { id } = useSearchParams()
  const [item, setItem] = useState<Order>()
  const orders = useRecoilValueLoadable(ordersAtom)

  useEffect(() => {
    if (orders.state === 'hasValue') {
      const foundItem = orders.contents.find((order: Order) => order.id === id)
      if (foundItem) {
        setItem(foundItem)
      }
    }
  }, [id, orders])

  if (orders.state === 'loading') {
    return <View>Loading...</View>
  }

  if (!item) {
    return <NotFoundScreen />
  }

  return (
    <View>
      <Stack.Screen
        options={{
          title: item.id,
          presentation: 'modal',
          headerShown: true,
        }}
      />
      <View>
        <OrderDetailsView order={item} />
      </View>
    </View>
  )
}

export default OrderDetailsScreen
