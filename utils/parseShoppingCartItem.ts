import { FoodItemDto } from '../data/FoodItemDto'
import { ShoppingCartItem } from '../data/ShoppingCartItem'

export const parseShoppingCartItem = (foodItem: FoodItemDto, selectedOption: string) => {
  let cartItem: ShoppingCartItem = {
    id: foodItem.id,
    title: foodItem.title,
    quantity: 1,
    image: foodItem.image,
  }

  const option = foodItem.options?.find(o => o.label === selectedOption)

  if (option) {
    cartItem.option = option.label
    cartItem.price = option.value
    cartItem.id += option.label
  }

  if (foodItem.prices && foodItem.prices.length === 1) {
    cartItem.price = foodItem.prices[0]
  }

  cartItem.spicy = foodItem.spicy

  return cartItem
}