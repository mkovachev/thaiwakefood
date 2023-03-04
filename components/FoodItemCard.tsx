import { Feather } from '@expo/vector-icons'
import { FoodItemDto } from '../data/FoodItemDto'
import { Image, StyleSheet, Platform, Pressable } from 'react-native'
import { Text, View } from '../ui/Themed'
import React from 'react'
import shapes from '../ui/shapes'
import { Link } from 'expo-router'


interface Props {
  item: FoodItemDto
}

const FoodItemCard = ({ item }: Props) => {

  return (
    <View key={item.id} style={styles.container}>
      <Image style={styles.image} source={{ uri: item.image }} />
      <Feather
        style={styles.favoriteIcon}
        name="heart"
        size={24}
        accessibilityHint="Favorite this item"
      />
      <Text numberOfLines={1} style={styles.id}>
        # {item.id}
      </Text>
      <Text numberOfLines={3} style={styles.title}>
        {item.title}
      </Text>
      <Text numberOfLines={4} style={styles.description}>
        {item.description}
      </Text>
      <Link href={`menu/${item.id}`}>
        <Pressable
          style={styles.touchableShowMore}
          accessibilityLabel={`Show details for ${item.title}`}>
          <Text style={styles.showMoreText}>show details</Text>
        </Pressable>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: .2,
    border: shapes.borderYellow,
    borderRadius: 20,
    margin: 10
  },
  image: {
    width: 150,
    height: 150,
  },
  id: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 18,
    position: "absolute",
    left: 10,
  },
  favoriteIcon: {
    position: "absolute",
    right: 10,
  },
  title: {
    fontFamily: 'MontserratBold',
    fontSize: 20,
    maxWidth: 150,
    marginTop: 10,
    marginBottom: 5,
  },
  description: {
    fontFamily: 'MontserratSemiBold',
    fontSize: Platform.OS === 'web' ? 15 : 10,
    maxWidth: 150,
  },
  touchableShowMore: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    border: shapes.borderYellow,
  },
  showMoreText: {
    fontFamily: 'MontserratMedium',
    marginRight: 5,
    fontSize: Platform.OS === 'web' ? 15 : 14,
  }
})

export default FoodItemCard
