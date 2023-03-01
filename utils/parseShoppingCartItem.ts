import { FoodItem } from "../data/FoodItem"
import { ShoppingCartItem } from "../data/ShoppingCartItem"

//TODO: parsed selected option
export const parseShoppingCartItem = (foodItem: FoodItem) => {
  if (foodItem && foodItem.options?.length !== 0) {
    const parsed: ShoppingCartItem = {
      ...foodItem,
      option: foodItem.options?.[0].toString(),
      price: foodItem.options?.[0].toString(),
      spicy: foodItem.spicy?.[0]
    }

    return parsed
  }

  return null
}