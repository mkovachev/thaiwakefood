import { CategoryEnum } from "./CategoryEnum"

export interface FoodItemDb {
  id: string
  title: string
  description: string
  category: CategoryEnum
  image: string
  options?: string
  prices: string
  spicy: string
}