import { CategoryEnum } from "./CategoryEnum"

export interface FoodItemDb {
  id: number
  title: string
  description: string
  category: CategoryEnum
  image: string
  options?: string
  prices: string
  spicy: string
}