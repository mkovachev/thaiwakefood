import { FoodItemDb } from '../data/FoodItemDb'
import { FoodItemDto } from '../data/FoodItemDto'
import { Option } from '../data/Option'

export const parseData = (data: FoodItemDb[]): FoodItemDto[] => {
  return data.map(item => {
    const options: Option[] = []
    const prices: string[] = []
    const spicy: string[] = []

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
    }

    if (item.spicy) {
      spicy.push(...item.spicy.split("/").map(s => s.trim()))
    }

    return {
      id: item.id,
      title: item.title,
      description: item.description,
      category: item.category,
      image: item.image,
      options: options.length > 0 ? options : undefined,
      prices: prices.length > 0 ? prices : undefined,
      spicy: spicy.length > 0 ? spicy : undefined,
    }
  })
}