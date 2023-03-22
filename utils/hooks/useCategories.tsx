import axios from 'axios'
import { useQuery } from 'react-query'
import { Category } from '../../data/Category'

const getCategories = async (): Promise<Category[]> => {
  const url = ''
  const res = await axios.get(url)
  return res.data
}

export const useCategories = () => {
  return useQuery<Category[], Error>(
    ['categories'],
    () => getCategories()
  )
}