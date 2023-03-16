import AsyncStorage from '@react-native-async-storage/async-storage'

type StorageValue<T> = T | null

export interface StorageInterface<T> {
  getAll: () => Promise<StorageValue<T>[]>
  getItem: (key: string) => Promise<StorageValue<T>>
  addItem: (value: T extends { id: string, quantity: number } ? T : never, key: string) => Promise<void>
  setItem: (key: string, value: T) => Promise<void>
  removeItem: (key: string) => Promise<void>
  clear: () => Promise<void>
}

export function storage<T>(key: string): StorageInterface<T> {

  const getAll = async (): Promise<StorageValue<T>[]> => {
    try {
      const data = await AsyncStorage.getItem(key)
      if (data) {
        return JSON.parse(data)
      }
    } catch (error) {
      console.log(error)
    }
    return []
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
      console.log(error)
    }
    return null
  }

  const addItem = async <T extends { id: string, quantity: number }>(item: T, key: string): Promise<void> => {
    const cartStorage: StorageInterface<T> = storage(key);
    const existingItem = await cartStorage.getItem(item.id)

    if (existingItem) {
      const newQuantity = existingItem.quantity + item.quantity
      const updatedItem: T = {
        ...existingItem,
        quantity: newQuantity
      }
      await cartStorage.setItem(item.id, updatedItem)
    } else {
      const items = await cartStorage.getAll() || []
      items.push(item)
      await AsyncStorage.setItem(key, JSON.stringify(items))
    }
  }

  const setItem = async (id: string, value: T): Promise<void> => {
    try {
      const data = await AsyncStorage.getItem(key)
      if (data) {
        const parsedData = JSON.parse(data)
        const newData = parsedData.map((d: any) => (d.id === id ? { ...d, ...value } : d))
        await AsyncStorage.setItem(key, JSON.stringify(newData))
      } else {
        const newData = [{ id, ...value }]
        await AsyncStorage.setItem(key, JSON.stringify(newData))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const removeItem = async (id: string): Promise<void> => {
    try {
      const data = await AsyncStorage.getItem(key)
      if (data) {
        const parsedData = JSON.parse(data)
        const newData = parsedData.filter((d: any) => d.id !== id)
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
    getAll,
    getItem,
    addItem,
    setItem,
    removeItem,
    clear
  }
}

export default storage
