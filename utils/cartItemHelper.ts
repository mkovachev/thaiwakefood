import { Store } from '../context/store'
import { CartItem } from "../data/CartItem"

export const handleRemoveItem = (item: CartItem, store: Store<CartItem>) => {
  store.operations.removeById(item.id)
}

export const handleItemAmountDecrease = (item: CartItem, items: CartItem[], store: Store<CartItem>) => {
  if (item.amount === 1) return
  item.amount -= 1
  store.operations.updateById(item.id, item)
  const updatedItems = items.map(i => i.id === item.id ? item : i)
  store.operations.setItems(updatedItems)
}


export const handleItemAmountIncrease = (item: CartItem, items: CartItem[], store: Store<CartItem>) => {
  item.amount += 1
  store.operations.updateById(item.id, item)
  const updatedItems = items.map(i => i.id === item.id ? item : i)
  store.operations.setItems(updatedItems)
}
