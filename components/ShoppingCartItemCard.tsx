import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { ShoppingCartItem } from '../data/ShoppingCartItem';
import colors from '../ui/colors';

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
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
    borderBottomColor: colors.black5,
    borderBottomWidth: .2,
    backgroundColor: colors.white
  },
  image: {
    width: 90,
    height: 80,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 5,
  },
  option: {
    marginBottom: 5,
  },
  price: {
    marginBottom: 5,
  },
  spicy: {
    marginBottom: 5,
  },
  quantity: {
    marginLeft: 10,
  },
});

export default ShoppingCartItemCard;
