import React from 'react'
import { StyleSheet, Image, Text, View } from 'react-native'
import { FoodItemDto } from '../data/FoodItemDto'

interface Props {
  item: FoodItemDto
  onClose: () => void
}

const FoodItemDetails = ({ item }: Props) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>THB {item.prices}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontFamily: 'MontserratBold',
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontFamily: 'MontserratRegular',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontFamily: 'MontserratSemiBold',
    marginTop: 16,
    textAlign: 'right',
  },
})

export default FoodItemDetails
