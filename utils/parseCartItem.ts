import { MenuItem } from '../data/MenuItem'
import { CartItem } from '../data/CartItem'

export const parseCartItem = (menuItem: MenuItem, selectedOption: string) => {

  const selectedItem: CartItem = {
    id: menuItem.id + selectedOption,
    name: menuItem.name,
    quantity: 1,
    image: menuItem.image,
    option: selectedOption,
    price: menuItem?.price || Number(menuItem.options?.find(o => o.label === selectedOption)?.value),
    spicy: menuItem.spicy,
  }

  return selectedItem
}