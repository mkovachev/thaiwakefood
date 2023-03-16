import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShoppingCartItem } from '../data/ShoppingCartItem';


export interface ShoppingCartStorageProps {
  getAll: () => Promise<ShoppingCartItem[]>;
  addToCart: (item: ShoppingCartItem) => Promise<void>;
  updateCartItem: (id: string, quantity: number) => Promise<void>;
  removeCartItem: (id: string) => Promise<void>;
}

const CART_STORAGE_KEY = 'shopping-cart';

export function shoppingCartStorage(): ShoppingCartStorageProps {
  const getAll = async (): Promise<ShoppingCartItem[]> => {
    try {
      const data = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (error) {
      console.log(error);
    }
    return [];
  };

  const addToCart = async (item: ShoppingCartItem): Promise<void> => {
    try {
      const data = await AsyncStorage.getItem(CART_STORAGE_KEY);
      console.log(data)
      if (data) {
        const parsedData = JSON.parse(data);
        const existingItem = parsedData.find((item: ShoppingCartItem) => item.id === item.id);
        console.log(existingItem)
        if (existingItem) {
          existingItem.quantity += 1; // Increase quantity of existing item by 1
        } else {
          parsedData.push({ ...item, quantity: 1 }); // Add new item with quantity of 1
        }
        await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(parsedData));
      } else {
        await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify([{ ...item, quantity: 1 }]));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartItem = async (id: string, quantity: number): Promise<void> => {
    try {
      const data = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (data) {
        const parsedData = JSON.parse(data);
        const existingItem = parsedData.find((item: ShoppingCartItem) => item.id === id);
        if (existingItem) {
          existingItem.quantity = quantity;
          await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(parsedData));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = async (id: string): Promise<void> => {
    try {
      const data = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (data) {
        const parsedData = JSON.parse(data);
        const newData = parsedData.filter((item: ShoppingCartItem) => item.id !== id)
        await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newData))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    getAll,
    addToCart,
    updateCartItem,
    removeCartItem,
  }
}

export default shoppingCartStorage