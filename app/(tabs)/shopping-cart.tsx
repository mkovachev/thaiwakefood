import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { CartItem } from '../../data/CartItem'
import storageKeys from '../../constants/storageKeys'
import useStorage from '../../context/storage'
import { View, Text } from '../../ui/Themed'
import colors from '../../ui/colors'
import fontFamily from '../../ui/fontFamily'
import { formatInTHB } from '../../utils/formatInTHB'
import { SelectedItemView } from '../../components/SelectedItemView'


export default function ShoppingCartScreen() {
  const { getAll, setAll, removeItem } = useStorage<CartItem>(storageKeys.shoppingcart)
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const getItems = async () => {
      const items = await getAll()
      setItems(items.map(item => item as CartItem))
    }

    getItems()
  }, [])

  const handleRemoveItem = async (item: CartItem) => {
    await removeItem(item.id)
    const updatedItems = items.filter(i => i.id !== item.id)
    setItems(updatedItems)
    await setAll(updatedItems)
  }

  const totalPrice = items.reduce((total, item) => {
    return total + parseFloat(item.price) * item.quantity
  }, 0)

  const renderFooter = () => {
    if (totalPrice > 0) {
      return (
        <View style={styles.total}>
          <Text style={styles.totalText}>Total price: {formatInTHB(totalPrice)}</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.noItems}>
          <Text style={styles.noItemsText}>No items in cart</Text>
        </View>
      )
    }
  };


  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => `${item.id}${item.option}`}
        renderItem={({ item }) =>
          <SelectedItemView
            item={item}
            onRemove={() => handleRemoveItem(item)}
          />}
        ListFooterComponent={renderFooter}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  total: {
    margin: 10,
    alignItems: 'flex-end',
  },
  totalText: {
    fontFamily: fontFamily.MontserratMedium,
    fontSize: 16,
  },
  noItems: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noItemsText: {
    fontFamily: fontFamily.MontserratMedium,
    fontSize: 20,
    color: colors.blue,
  },
})
