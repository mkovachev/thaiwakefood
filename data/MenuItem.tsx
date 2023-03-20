import { CategoryEnum } from "./CategoryEnum"
import { Option } from "./Option"

export interface MenuItem {
  id: string
  title: string
  category?: CategoryEnum
  image: string
  options?: Option[]
  price?: number
  spicy: boolean
}