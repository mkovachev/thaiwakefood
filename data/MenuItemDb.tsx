import { CategoryEnum } from "./CategoryEnum"

export interface MenuItemDb {
  id: string
  title: string
  description: string
  category: CategoryEnum
  image: string
  options?: string
  prices: string
  spicy: string
}