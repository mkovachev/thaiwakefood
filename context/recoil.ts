import { recoilPersist } from 'recoil-persist'
import { Category } from '../data/Category'
import { MenuItem } from '../data/MenuItem'
import { CartItem } from '../data/CartItem'
import storeKeys from './storeKeys'
import { cartStore, categoriesStore, favoritesStore, menuStore, ordersStore } from './store'
import { atom } from 'recoil'
import { Order } from '../data/Order'

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

export const orders = recoilPersist({
  key: storeKeys.orders,
  storage: ordersStore,
})


export const categoriesAtom = atom<Category[]>({
  key: storeKeys.categories,
  default: categoriesStore.getAll() ?? [],
  effects_UNSTABLE: [
    ({ onSet }) => onSet(newValue => menuStore.setAll(newValue))
  ]
})

export const menuAtom = atom<MenuItem[]>({
  key: storeKeys.menu,
  default: menuStore.getAll() ?? [],
  effects_UNSTABLE: [
    ({ onSet }) => onSet(newValue => menuStore.setAll(newValue))
  ]
})

export const cartAtom = atom<CartItem[]>({
  key: storeKeys.cart,
  default: cartStore.getAll() ?? [],
  effects_UNSTABLE: [
    ({ onSet }) => onSet(newValue => menuStore.setAll(newValue))
  ]
})

export const favoritesAtom = atom<CartItem[]>({
  key: storeKeys.favorites,
  default: favoritesStore.getAll() ?? [],
  effects_UNSTABLE: [
    ({ onSet }) => onSet(newValue => favoritesStore.setAll(newValue))
  ]
})

export const ordersAtom = atom<Order[]>({
  key: storeKeys.orders,
  default: ordersStore.getAll() ?? [],
  effects_UNSTABLE: [
    ({ onSet }) => onSet(newValue => ordersStore.setAll(newValue))
  ]
})