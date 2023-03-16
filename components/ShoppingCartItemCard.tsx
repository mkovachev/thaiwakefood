import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { ShoppingCartItem } from '../data/ShoppingCartItem';

interface Props {
  item: ShoppingCartItem;
}

const ShoppingCartItemCard = ({ item }: Props) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        {item.option && <Text style={styles.option}>{item.option}</Text>}
        <Text style={styles.price}>{item.price}</Text>
        {item.spicy && <Text style={styles.spicy}>{item.spicy}</Text>}
      </View>
      <Text style={styles.quantity}>{item.quantity}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  option: {
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  spicy: {
    marginBottom: 5,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ShoppingCartItemCard;
