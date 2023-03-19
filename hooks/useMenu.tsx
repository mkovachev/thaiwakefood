import axios from 'axios'
import { useQuery } from 'react-query'
import { MenuItem } from '../data/MenuItem'
import { URL, SHEET_ID, SHEET_MENU, API_KEY } from '@env'
import { mapGoogleSheetData } from '../utils/mapGoogleSheetData'
import { parseMenu } from '../utils/parseMenu'


const getMenu = async (): Promise<MenuItem[]> => {
  const url = `${URL}/${SHEET_ID}/values/${SHEET_MENU}?valueRenderOption=FORMATTED_VALUE&key=${API_KEY}`
  const res = await axios.get(url)
  return parseMenu(mapGoogleSheetData(res.data))
}

export const useMenu = () => {
  return useQuery<MenuItem[], Error>(
    ['menu'],
    () => getMenu()
  )
}
