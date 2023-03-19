import { MenuItemDb } from '../data/MenuItemDb'
import { MenuItem } from '../data/MenuItem'
import { Option } from '../data/Option'

export const parseMenu = (data: MenuItemDb[]): MenuItem[] => {
  return data.map(item => {
    const options: Option[] = []
    const prices: string[] = []
    let spicy: boolean = false

    if (item.options && item.prices) {
      const optionLabels = item.options.split("/")
      const optionPrices = item.prices.split("/")

      for (let i = 0;i < optionLabels.length;i++) {
        options.push({
          label: optionLabels[i].trim(),
          value: optionPrices[i].trim()
        })
        prices.push(optionPrices[i].trim())
      }
    } else {
      prices.push(item.prices)
    }

    if (item.spicy) {
      spicy = true
    }

    return {
      id: item.id,
      title: item.title,
      description: item.description,
      category: item.category,
      image: item.image,
      options: options.length > 0 ? options : undefined,
      prices: prices,
      spicy: spicy,
    }
  })
}