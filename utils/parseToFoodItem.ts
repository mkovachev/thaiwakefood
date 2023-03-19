import { MenuItem } from '../data/MenuItem'
import { SelectedItem } from '../data/SelectedItem'

export const parseToFoodItem = (cartItem: SelectedItem) => {
  const foodItem: MenuItem = {
    id: cartItem.id,
    title: cartItem.title,
    image: cartItem.image,
    spicy: cartItem.spicy ?? false,
  }

  if (cartItem.option && cartItem.price) {
    foodItem.options = [{ label: cartItem.option, value: cartItem.price }]
  } else {
    foodItem.prices = cartItem.price ? [cartItem.price] : []
  }

  return foodItem
}