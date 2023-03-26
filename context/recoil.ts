import { atom, useRecoilValueLoadable } from 'recoil'
import { Category } from '../data/Category'
import { MenuItem } from '../data/MenuItem'
import { CartItem } from '../data/CartItem'
import { recoilPersist } from 'recoil-persist'
import storeKeys from './storeKeys'
import { categoriesStore, menuStore, cartStore, favoritesStore } from './store'

const { persistAtom } = recoilPersist()

export const categoriesAtom = atom<Category[]>({
  key: storeKeys.categories,
  default: categoriesStore.getAll() as unknown as Category[],
  effects_UNSTABLE: [persistAtom],
})

export const menuAtom = atom<MenuItem[]>({
  key: storeKeys.menu,
  default: menuStore.getAll() as unknown as MenuItem[],
  effects_UNSTABLE: [persistAtom],
})

export const cartAtom = atom<CartItem[]>({
  key: storeKeys.cart,
  default: cartStore.getAll() as unknown as CartItem[],
  effects_UNSTABLE: [persistAtom],
})

export const favoritesAtom = atom<CartItem[]>({
  key: storeKeys.favorites,
  default: favoritesStore.getAll() as unknown as CartItem[],
  effects_UNSTABLE: [persistAtom],
})

export const categories = recoilPersist({
  key: storeKeys.categories,
  storage: categoriesStore,
})

export const menu = recoilPersist({
  key: storeKeys.menu,
  storage: menuStore,
})

export const cart = recoilPersist({
  key: storeKeys.cart,
  storage: cartStore,
})

export const favorites = recoilPersist({
  key: storeKeys.favorites,
  storage: favoritesStore,
})