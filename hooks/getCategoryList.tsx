import axios from 'axios'
import { useQuery } from 'react-query'
import { CategoryItem } from '../data/CategoryItem'

const getCategoryList = async (): Promise<CategoryItem[]> => {
  const url = `${process.env.SHEETSON_URL}/${process.env.SPREADSHEET_CATEGORIES}`
  const params = {
    apiKey: process.env.API_KEY,
    spreadsheetId: process.env.SPREADSHEET_ID
  }

  const res = await axios.get(url, { params })
  return res.data.results as CategoryItem[]
};

export const useGetCategoryList = () => {
  return useQuery<CategoryItem[], Error>(
    ['categories'],
    () => getCategoryList()
  )
}