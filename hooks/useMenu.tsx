import axios from 'axios'
import { useQuery } from 'react-query'
import { MenuItem } from '../data/MenuItem'


const getFoodItemList = async (): Promise<MenuItem[]> => {
  const url = ''
  return await axios.get(url)
}

export const useGetFoodItemList = () => {
  return useQuery<MenuItem[], Error>(
    ['menu'],
    () => getFoodItemList()
  )
}