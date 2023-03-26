import { recoilPersist } from 'recoil-persist'
import { Category } from '../data/Category'
import { MenuItem } from '../data/MenuItem'
import { CartItem } from '../data/CartItem'
import storeKeys from './storeKeys'
import { cartStore, categoriesStore, favoritesStore, menuStore } from './store'
import { atom } from 'recoil'

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


export const categoriesAtom = atom<Category[]>({
  key: storeKeys.categoriesAtom,
  default: [],
  effects_UNSTABLE: [
    ({ onSet }) => onSet(newValue => categoriesStore.setAll(newValue))
  ]
})

export const menuAtom = atom<MenuItem[]>({
  key: storeKeys.menuAtom,
  default: [],
  effects_UNSTABLE: [
    ({ onSet }) => onSet(newValue => menuStore.setAll(newValue))
  ]
})

export const cartAtom = atom<CartItem[]>({
  key: storeKeys.cartAtom,
  default: [],
  effects_UNSTABLE: [
    ({ onSet }) => onSet(newValue => cartStore.setAll(newValue))
  ]
})

export const favoritesAtom = atom<CartItem[]>({
  key: storeKeys.favoritesAtom,
  default: [],
  effects_UNSTABLE: [
    ({ onSet }) => onSet(newValue => favoritesStore.setAll(newValue))
  ]
})