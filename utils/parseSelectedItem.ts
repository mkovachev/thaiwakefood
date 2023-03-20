import { MenuItem } from '../data/MenuItem'
import { SelectedItem } from '../data/SelectedItem'

export const parseSelectedItem = (menuItem: MenuItem, selectedOption: string) => {
  
  const selectedItem: SelectedItem = {
    id: menuItem.id + selectedOption,
    title: menuItem.title,
    amount: 1,
    image: menuItem.image,
    option: selectedOption,
    price: menuItem?.price || Number(menuItem.options?.find(o => o.label === selectedOption)?.value),
    spicy: menuItem.spicy,
  }

  return selectedItem
}