import AsyncStorage from '@react-native-async-storage/async-storage'

type StorageValue<T> = T | null

interface StorageInterface<T> {
  getAll: () => Promise<StorageValue<T>[] | null>
  getItem: (key: string) => Promise<StorageValue<T>>
  setItem: (key: string, value: T) => Promise<void>
  removeItem: (key: string) => Promise<void>
  clear: () => Promise<void>
}

function createStorage<T>(key: string): StorageInterface<T> {
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
    setItem,
    removeItem,
    clear,
  }
}

export default createStorage
