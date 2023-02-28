import axios from 'axios'
import { useQuery } from 'react-query'
import { CategoryItem } from '../data/CategoryItem'
import { URL, SHEET_ID, SHEET_CATEGORIES, API_KEY } from '@env'
import { formatData } from '../utils/formatData';

const getCategoryList = async (): Promise<CategoryItem[]> => {
  const url = `${URL}/${SHEET_ID}/values/${SHEET_CATEGORIES}?valueRenderOption=FORMATTED_VALUE&key=${API_KEY}`
  const res = await axios.get(url)
  return formatData(res.data)
};

export const useGetCategoryList = () => {
  return useQuery<CategoryItem[], Error>(
    ['categories'],
    () => getCategoryList()
  )
}