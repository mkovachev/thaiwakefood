import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import ShoppingCartItemCard from '../../components/ShoppingCartItemCard';
import { ShoppingCartItem } from '../../data/ShoppingCartItem';
import { ShoppingCartContext } from '../_layout';


export default function ShoppingCartScreen() {
  const shoppingCart = useContext(ShoppingCartContext);
  const [cartItems, setCartItems] = useState<ShoppingCartItem[]>([]);

  useEffect(() => {
    const getCartItems = async () => {
      const items = await shoppingCart?.getAll()

      if (items) {
        setCartItems(items)
      }
    };

    getCartItems();
  }, [])

  console.log(cartItems)

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
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
