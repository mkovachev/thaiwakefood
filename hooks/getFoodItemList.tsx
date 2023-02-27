import axios from 'axios'
import { useQuery } from 'react-query'
import { FoodItem } from '../data/FoodItem'
import { parseFoodItemList } from '../utils/parseFoodItemList'


const getFoodItemList = async (): Promise<FoodItem[]> => {
  const url = `${process.env.SHEETSON_URL}/${process.env.SPREADSHEET_MENU}`
  const params = {
    apiKey: process.env.API_KEY,
    spreadsheetId: process.env.SPREADSHEET_ID
  }

  const res = await axios.get(url, { params })
  const foodItems = parseFoodItemList(res.data.results)
  return foodItems
};

export const useGetFoodItemList = () => {
  return useQuery<FoodItem[], Error>(
    ['food-item-list'],
    () => getFoodItemList()
  )
}