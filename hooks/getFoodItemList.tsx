import axios from 'axios'
import { useQuery } from 'react-query'
import { FoodItemDto } from '../data/FoodItemDto'
import { URL, SHEET_ID, SHEET_MENU, API_KEY } from '@env'
import { formatData } from '../utils/formatData'
import { parseFoodItemDto } from '../utils/parseFoodItemDto'


const getFoodItemList = async (): Promise<FoodItemDto[]> => {
  const url = `${URL}/${SHEET_ID}/values/${SHEET_MENU}?valueRenderOption=FORMATTED_VALUE&key=${API_KEY}`
  const res = await axios.get(url)
  return parseFoodItemDto(formatData(res.data))
}

export const useGetFoodItemList = () => {
  return useQuery<FoodItemDto[], Error>(
    ['food-item-list'],
    () => getFoodItemList()
  )
}
