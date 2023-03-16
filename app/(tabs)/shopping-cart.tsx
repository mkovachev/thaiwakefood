import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import ShoppingCartItemCard from '../../components/ShoppingCartItemCard';
import { ShoppingCartItem } from '../../data/ShoppingCartItem';
import storageKeys from '../../constants/storageKeys'
import useStorage from '../../context/storage'


export default function ShoppingCartScreen() {
  const { getAll } = useStorage<ShoppingCartItem>(storageKeys.SHOPPING_CART_KEY)
  const [items, setItems] = useState<ShoppingCartItem[]>([])

  useEffect(() => {
    const getItems = async () => {
      const items = await getAll()
      setItems(items.map(item => item as ShoppingCartItem))
    }

    getItems()
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ShoppingCartItemCard item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
