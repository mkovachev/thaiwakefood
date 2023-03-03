import { Feather } from '@expo/vector-icons'
import { FoodItemDto } from '../data/FoodItemDto'
import { Image, StyleSheet, View, TouchableOpacity, Platform } from 'react-native'
import { Text } from '../ui/Themed'
import React, { useState } from 'react'
import shapes from '../ui/shapes'
import FoodItemDetails from './FoodItemDetails'

interface Props {
  item: FoodItemDto
}

const FoodItem = ({ item }: Props) => {
  const [showDetails, setShowDetails] = useState(false)

  const handlePress = () => {
    setShowDetails(true)
  }

  return (
    <View key={item.id} style={styles.container}>
      <TouchableOpacity style={styles.touchableImage} onPress={handlePress} accessibilityLabel={item.title}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </TouchableOpacity>
      <Feather style={styles.favoriteIcon} name="heart" size={24} accessibilityHint="Favorite this item" />
      <Text numberOfLines={1} style={styles.id}>
        # {item.id}
      </Text>
      <Text numberOfLines={3} style={styles.title}>
        {item.title}
      </Text>
      <Text numberOfLines={4} style={styles.description}>
        {item.description}
      </Text>
      <TouchableOpacity
        style={styles.touchableShowMore}
        onPress={handlePress}
        accessibilityLabel={`Show details for ${item.title}`}>
        <Text style={styles.showMoreText}>
          show details
        </Text>
      </TouchableOpacity>
      {showDetails && <FoodItemDetails item={item} onClose={() => setShowDetails(false)} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    padding: 20,
    borderWidth: 2,
    border: shapes.borderYellow,
    borderRadius: 20,
    marginVertical: 10,
  },
  touchableImage: {
    width: Platform.OS === 'web' ? 250 : 150,
    height: Platform.OS === 'web' ? 200 : 150,
  },
  image: {
    width: '90%',
    height: '95%',
  },
  id: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 20,
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
    fontSize: Platform.OS === 'web' ? 15 : 11,
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
    fontSize: Platform.OS === 'web' ? 15 : 12,
  }
})

export default FoodItem
