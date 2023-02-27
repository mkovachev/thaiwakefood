import { FoodItem } from "../data/FoodItem"
import { FoodItemDb } from "../data/FoodItemDb"
import { parseOptions } from "./parseOptions"
import { parseOptionsWithPrices } from "./parseOptionsWithPrices"

export const parseFoodItemList = (data: FoodItemDb[]) => {
  const foodItemList: FoodItem[] = data?.map((foodItem: FoodItemDb) => {
    return ({
      ...foodItem,
      options: parseOptionsWithPrices(parseOptions(foodItem?.options), parseOptions(foodItem?.prices)) || null,
      prices: parseOptions(foodItem?.prices),
      spicy: parseOptions(foodItem?.spicy)
    } as unknown as FoodItem)
  })

  return foodItemList
}