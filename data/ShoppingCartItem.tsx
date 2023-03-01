import { CategoryEnum } from "./CategoryEnum"

export interface ShoppingCartItem {
  id: number
  title: string
  description: string
  category: CategoryEnum
  image: string
  option?: string
  price?: string
  spicy?: string
}