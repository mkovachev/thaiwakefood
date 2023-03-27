import { View } from '../../ui/components/Themed'
import { Stack, useSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { MenuItem } from '../../data/MenuItem'
import NotFoundScreen from '../[...missing]'
import { ordersAtom } from '../../context/recoil'
import { useRecoilValueLoadable } from 'recoil'
import { Order } from '../../data/Order'
import OrderDetailsView from '../../components/OrderDetailsView'

const OrderDetailsScreen = () => {
  const { id } = useSearchParams()
  const [item, setItem] = useState<Order>()
  const orders = useRecoilValueLoadable(ordersAtom)

  console.log(id)
  console.log(orders)

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
        <OrderDetailsView />
      </View>
    </View>
  )
}

export default OrderDetailsScreen
