import axios from 'axios'
import { useQuery } from 'react-query'
import { FoodItem } from '../data/FoodItem'
import { parseFoodItemList } from '../utils/parseFoodItemList'
import { URL, SHEET_ID, SHEET_MENU, API_KEY } from '@env'
import { formatData } from '../utils/formatData'


const getFoodItemList = async (): Promise<FoodItem[]> => {
  const url = `${URL}/${SHEET_ID}/values/${SHEET_MENU}?valueRenderOption=FORMATTED_VALUE&key=${API_KEY}`
  const res = await axios.get(url)
  const foodItems = parseFoodItemList(formatData(res.data))
  return foodItems
}

export const useGetFoodItemList = () => {
  return useQuery<FoodItem[], Error>(
    ['food-item-list'],
    () => getFoodItemList()
  )
}