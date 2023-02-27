import { CategoryEnum } from "./CategoryEnum"
import { Option } from "../components/Option"

export interface FoodItem {
  id: number
  title: string
  description: string
  category: CategoryEnum
  image: string
  options?: Option[]
  prices?: string[]
  spicy?: string[]
}