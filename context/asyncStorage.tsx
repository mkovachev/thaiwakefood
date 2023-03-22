import AsyncStorage from '@react-native-async-storage/async-storage'
import { CartItem } from '../data/CartItem'
import { Category } from '../data/Category'
import { MenuItem } from '../data/MenuItem'
import storeKeys from './storeKeys'

type StorageValue<T> = T | null

export interface StorageInterface<T> {
  store: {
    getAll: () => Promise<StorageValue<T>[]>
    setAll: (values: StorageValue<T>[]) => Promise<void>
    getItem: (id: string) => Promise<StorageValue<T>>
    addItem: (item: T & { id: string, amount?: number }) => Promise<void>
    setItem: (id: string, item: T) => Promise<void>
    removeItem: (id: string) => Promise<void>
    clear: () => Promise<void>
  }
}

export function storage<T extends { id: string, amount?: number }>(key: string): StorageInterface<T> {

  const getAll = async (): Promise<StorageValue<T>[]> => {
    try {
      const data = await AsyncStorage.getItem(key)
      if (data) {
        return JSON.parse(data)
      }
    } catch (error) {
      console.error(`Error getting all items from AsyncStorage: ${error}`)
    }
    return []
  }

  const setAll = async (values: StorageValue<T>[]): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(values))
    } catch (error) {
      console.error(`Error setting all items in AsyncStorage: ${error}`)
    }
  }

  const getItem = async (id: string): Promise<StorageValue<T>> => {
    try {
      const data = await AsyncStorage.getItem(key)
      if (data) {
        const parsedData = JSON.parse(data)
        const item = parsedData.find((d: any) => d.id === id)
        return item ?? null
      }
    } catch (error) {
      console.error(`Error getting item with id ${id} from AsyncStorage: ${error}`)
    }
    return null
  }

  const addItem = async (item: T & { id: string, amount?: number }): Promise<void> => {
    try {
      let items = await getAll()
      const existingItem = items.find((i) => i?.id === item.id)
      if (existingItem && existingItem.amount) {
        items = [{ ...existingItem, amount: existingItem?.amount + 1 }]
      } else {
        items.push(item)
      }
      await setAll(items)
    } catch (error) {
      console.error(`Error adding item ${JSON.stringify(item)} to AsyncStorage: ${error}`)
    }
  }

  const setItem = async (id: string, item: T): Promise<void> => {
    try {
      const data = await AsyncStorage.getItem(key)
      if (data) {
        const parsedData = JSON.parse(data)
        const newData = parsedData.map((i: any) => (i.id === id ? { ...i, ...item } : i))
        await AsyncStorage.setItem(key, JSON.stringify(newData))
      } else {
        const newData = [{ ...item }]
        await AsyncStorage.setItem(key, JSON.stringify(newData))
      }
    } catch (error) {
      console.error(`Error setting item with id ${id} in AsyncStorage: ${error}`)
    }
  }

  const removeItem = async (id: string): Promise<void> => {
    try {
      const data = await AsyncStorage.getItem(key)
      if (data) {
        const parsedData = JSON.parse(data)
        const newData = parsedData.filter((item: any) => item.id !== id)
        await AsyncStorage.setItem(key, JSON.stringify(newData))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const clear = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    store: {
      getAll,
      setAll,
      getItem,
      addItem,
      setItem,
      removeItem,
      clear
    }
  }
}

export const categoryStorage: StorageInterface<Category> = storage(storeKeys.categories)
export const menuStorage: StorageInterface<MenuItem> = storage(storeKeys.menu)
export const cartStorage: StorageInterface<CartItem> = storage(storeKeys.cart)
export const favoritesStorage: StorageInterface<CartItem> = storage(storeKeys.favorites)

export default storage
