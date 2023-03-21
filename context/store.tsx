import { MMKV } from 'react-native-mmkv'
import { CategoryItem } from '../data/CategoryItem'
import { MenuItem } from '../data/MenuItem'
import { CartItem } from '../data/CartItem'

type StoreEntity<T> = {
  id: string
} & T

type StoreOperations<T> = {
  getAll: () => StoreEntity<T>[]
  setItems: (items: (T | undefined)[]) => void
  addItem: (item: T) => void
  addMany: (items: T[]) => void
  removeById: (id: string | number) => void
  updateById: (id: string | number, updatedItem: T) => void
  getById: (id: string | number) => T | undefined
}

type StoreName = 'menu' | 'categories' | 'cart' | 'favorites'

type StoreData = {
  [key in StoreName]: MMKV
}

type Store<T> = {
  storeName: StoreName
  operations: StoreOperations<T>
}

const storeData: StoreData = {
  menu: new MMKV(),
  categories: new MMKV(),
  cart: new MMKV(),
  favorites: new MMKV(),
}

const createEntityOperations = <T extends {
  id: string, amount?: number
}>(
  storeName: StoreName,
  store: MMKV
): StoreOperations<T> => {

  const getAll = (): StoreEntity<T>[] => {
    const items = store.getString(storeName)
    if (items) {
      try {
        return JSON.parse(items)
      } catch (error) {
        console.error(error)
        return []
      }
    }
    return []
  }

  const setItems = (items: (T | undefined)[]): void => {
    const filteredItems = items.filter((item) => item !== undefined) as T[]
    store.set(storeName, JSON.stringify(filteredItems))
  }

  const getById = (id: string | number): T | undefined => {
    const items: T[] = JSON.parse(store.getString(storeName) || '')
    return items.find((item) => item.id === id.toString())
  }

  const addItem = (item: T): void => {
    let items: T[] = JSON.parse(store.getString(storeName) || '[]')
    const existingItem = items.find((i) => i.id === item.id)
    if (existingItem && existingItem?.amount) {
      existingItem.amount += 1
    } else {
      items.push({ ...item, amount: 1 })
    }
    store.set(storeName, JSON.stringify(items))
  }

  const addMany = (items: T[]): void => {
    let existingItems: T[] = JSON.parse(store.getString(storeName) || '[]')
    const newItems = items.map((item) => {
      const existingItem = existingItems.find((i) => i.id === item.id)
      if (existingItem && existingItem?.amount) {
        existingItem.amount += 1
        return existingItem
      } else {
        return { ...item, amount: 1 }
      }
    })
    const updatedItems = [...existingItems, ...newItems]
    store.set(storeName, JSON.stringify(updatedItems))
  }

  const removeById = (itemId: string | number): void => {
    let items: T[] = JSON.parse(store.getString(storeName) || '[]')
    items = items.filter((item) => item.id !== itemId)
    store.set(storeName, JSON.stringify(items))
  }

  const updateById = (itemId: string | number, updatedItem: T): void => {
    let items: T[] = JSON.parse(store.getString(storeName) || '[]')
    const updatedItems = items.map((item) => (item.id === itemId ? updatedItem : item))
    store.set(storeName, JSON.stringify(updatedItems))
  }

  return { getAll, setItems, getById, addItem, addMany, removeById, updateById }
}

const menu: Store<MenuItem> = {
  storeName: 'menu',
  operations: createEntityOperations<MenuItem>('menu', storeData.menu),
}

const categories: Store<CategoryItem> = {
  storeName: 'categories',
  operations: createEntityOperations<CategoryItem>('categories', storeData.categories),
}

const cart: Store<CartItem> = {
  storeName: 'cart',
  operations: createEntityOperations<CartItem>('cart', storeData.cart),
}

const favorites: Store<CartItem> = {
  storeName: 'favorites',
  operations: createEntityOperations<CartItem>('favorites', storeData.cart),
}

export { menu, categories, cart, favorites }
