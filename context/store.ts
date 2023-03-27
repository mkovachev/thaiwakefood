import AsyncStorage from '@react-native-async-storage/async-storage'
import storeKeys from './storeKeys'

export type Store = {
  getAll: () => Promise<any[]>
  setAll: (values: any[]) => Promise<void>
  getItem: (id: string) => string | Promise<string> | null
  addItem: (item: any) => Promise<void>
  setItem: (id: string, item: any) => Promise<void>
  removeItem: (id: string) => Promise<void>
  clear: () => Promise<void>
}

const store = (key: string): Store => {

  const getAll = async () => {
    const data = await AsyncStorage.getItem(key)
    return data ? JSON.parse(data) : []
  }

  const setAll = async (items: any[]) => {
    const data = JSON.stringify(items)
    await AsyncStorage.setItem(key, data)
  }

  const getItem = async (id: string): Promise<any> => {
    const data = await AsyncStorage.getItem(key)
    if (!data) return ''
    const parsedData = JSON.parse(data)
    const item = parsedData.find((i: any) => i.id === id)
    return item ?? ''
  }

  const addItem = async (item: any) => {
    const data = await AsyncStorage.getItem(key)
    const parsedData = data ? JSON.parse(data) : []
    const existingItemIndex = parsedData.findIndex((i: any) => i.id === item.id)
    if (existingItemIndex === -1) {
      parsedData.push({ ...item, amount: 1 })
    } else {
      parsedData[existingItemIndex].amount += 1
    }
    const newData = JSON.stringify(parsedData)
    await AsyncStorage.setItem(key, newData)
  }

  const setItem = async (id: string, item: any) => {
    const data = await AsyncStorage.getItem(key)
    const parsedData = data ? JSON.parse(data) : []
    const index = parsedData.findIndex((i: any) => i.id === id)
    if (index === -1) {
      parsedData.push({ id, item })
    } else {
      parsedData[index] = item
    }
    const newData = JSON.stringify(parsedData)
    await AsyncStorage.setItem(key, newData)
  }

  const removeItem = async (id: string) => {
    const data = await AsyncStorage.getItem(key)
    if (!data) return
    const parsedData = JSON.parse(data)
    const newData = parsedData.filter((i: any) => i.id !== id)
    await AsyncStorage.setItem(key, JSON.stringify(newData))
  }

  const clear = async () => {
    await AsyncStorage.removeItem(key)
  }

  return {
    getAll,
    setAll,
    getItem,
    addItem,
    setItem,
    removeItem,
    clear
  }
}

export default store

export const categoriesStore: Store = store(storeKeys.categories)
export const menuStore: Store = store(storeKeys.menu)
export const cartStore: Store = store(storeKeys.cart)
export const favoritesStore: Store = store(storeKeys.favorites)
export const ordersStore: Store = store(storeKeys.orders)
