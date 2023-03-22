import { StorageInterface } from '../context/asyncStorage'
import { CartItem } from "../data/CartItem"

export const handleRemoveItem = (item: CartItem, store: StorageInterface<CartItem>) => {
  store.store.removeItem(item.id)
}

export const handleItemAmountDecrease = (item: CartItem, items: CartItem[], store: StorageInterface<CartItem>) => {
  if (item.amount === 1) return
  item.amount -= 1
  store.store.setItem(item.id, item)
  const updatedItems = items.map(i => i.id === item.id ? item : i)
  store.store.setAll(updatedItems)
}


export const handleItemAmountIncrease = (item: CartItem, items: CartItem[], store: StorageInterface<CartItem>) => {
  item.amount += 1
  store.store.setItem(item.id, item)
  const updatedItems = items.map(i => i.id === item.id ? item : i)
  store.store.setAll(updatedItems)
}
