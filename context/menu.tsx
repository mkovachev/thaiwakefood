import { useAsyncStorage } from "@react-native-async-storage/async-storage"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { FoodItemDto } from '../data/FoodItemDto'


type MenuContext = {
  items: FoodItemDto[]
  addItem: (item: FoodItemDto) => void
  deleteItem: (id: string) => void
}

const MenuContext = createContext<MenuContext | undefined>(undefined)

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<FoodItemDto[] | null>(null)
  const { getItem, setItem } = useAsyncStorage('menu')

  // Load from storage
  useEffect(() => {
    let isMounted = true
    getItem().then((json: string | null) => {
      if (!isMounted) return

      if (json != null) {
        const loadedItems = JSON.parse(json)
        setItems(loadedItems ?? [])
      } else {
        setItems([])
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  // Persist to storage
  useEffect(() => {
    if (!items) return
    setItem(JSON.stringify(items))
  }, [items])

  const addItem = (item: FoodItemDto) => {
    const itemDb: FoodItemDto = { ...item }
    setItems((items: FoodItemDto[] | null) => items && [...items, itemDb])
  }

  const deleteItem = (id: string) => {
    setItems((items) => items && items?.filter((item: FoodItemDto) => item.id !== id))
  }

  if (!items) return null

  return (
    <MenuContext.Provider value={{ items, addItem, deleteItem }}>
      {children}
    </MenuContext.Provider>
  )
}

export const useMenu = () => {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider")
  }
  return context
}