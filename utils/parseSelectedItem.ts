import { MenuItem } from '../data/MenuItem'
import { SelectedItem } from '../data/SelectedItem'

export const parseSelectedItem = (menuItem: MenuItem, selectedOption: string) => {
  const selectedItem: SelectedItem = {
    id: menuItem.id,
    title: menuItem.title,
    quantity: 1,
    image: menuItem.image,
    price: menuItem.prices?.[0] || '',
    spicy: false,
    isFavorite: false
  }

  const option = menuItem.options?.find(o => o.label === selectedOption)

  if (option) {
    selectedItem.option = option.label
    selectedItem.price = option.value
    selectedItem.id += option.label
  }

  if (menuItem.prices && menuItem.prices.length === 1) {
    selectedItem.price = menuItem.prices[0]
  }

  selectedItem.spicy = menuItem.spicy

  return selectedItem
}