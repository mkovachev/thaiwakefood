import { useState, useEffect } from 'react'
import { CartItem } from '../data/CartItem'
import { cartStore} from '../context/store'
import { useQueryClient } from 'react-query'

export const useCart = () => {
  const queryClient = useQueryClient()
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    (async () => {
      try {
        const items = await cartStore.getAll()
        setItems(items as CartItem[])
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  const addItem = async (item: CartItem): Promise<void> => {
    try {
      let items = await cartStore.getAll()
      const existingItem = items.find((i) => i?.id === item.id)
      if (existingItem && existingItem.amount) {
        existingItem.amount += 1
      } else {
        items.push({ ...item, amount: 1 })
      }
      await cartStore.setAll(items)
      await queryClient.invalidateQueries()
    } catch (error) {
      console.error(`Error adding item ${JSON.stringify(item)} to AsyncStorage: ${error}`)
    }
  }

  const removeItem = async (itemId: string): Promise<void> => {
    try {
      let items = await cartStore.getAll()
      const updatedItems = items.filter(i => i?.id !== itemId)
      await cartStore.setAll(updatedItems)
      await queryClient.invalidateQueries()
    } catch (error) {
      console.error(`Error removing item with id ${itemId} from AsyncStorage: ${error}`)
    }
  }

  const updateItemAmount = async (itemId: string, amountChange: number): Promise<void> => {
    try {
      let items = await cartStore.getAll()
      const updatedItem = items.find((i) => i?.id === itemId)
      if (updatedItem && updatedItem.amount) {
        updatedItem.amount += amountChange
        if (updatedItem.amount < 1) {
          items = items.filter(i => i?.id !== itemId)
        }
        await cartStore.setAll(items)
        await queryClient.invalidateQueries( )
      }
    } catch (error) {
      console.error(`Error updating amount for item with id ${itemId} in AsyncStorage: ${error}`)
    }
  }

  const cartTotal = items.length > 0 ? items.reduce((total, item) => {
    return total + (item.price * item.amount)
  }, 0) : 0

  return {
    items,
    addItem,
    removeItem,
    updateItemAmount,
    cartTotal,
  }
}
