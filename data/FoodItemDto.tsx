import { CategoryEnum } from "./CategoryEnum"
import { Option } from "./Option"

export interface FoodItemDto {
  id: string
  title: string
  description: string
  category: CategoryEnum
  image: string
  options?: Option[]
  prices?: string[]
  spicy?: string[]
}