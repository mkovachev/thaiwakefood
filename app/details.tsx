import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native'
import { FoodItemDto } from '../data/FoodItemDto'
import { CategoryItem } from '../data/CategoryItem'
import MenuGrid from '../components/MenuGrid'

interface Props {
  item: FoodItemDto
  category?: CategoryItem | null
}

const DetailsScreen = ({ item, category }: Props) => {
  const [selectedItem, setSelectedItem] = useState<FoodItemDto | undefined>(undefined)

  const handleShowDetails = (item: FoodItemDto) => {
    setSelectedItem(item)
  }

  const handleCloseDetails = () => {
    setSelectedItem(undefined)
  }

  const addToCart = () => {
    if (selectedItem) {
      Linking.openURL('/cart')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>{item.title}</Text>
        <Text style={styles.detailsDescription}>{item.description}</Text>
        <TouchableOpacity style={styles.orderButton} onPress={addToCart}>
          <Text style={styles.orderButtonText}>Order Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={handleCloseDetails}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsDescription: {
    fontSize: 18,
    marginBottom: 20,
  },
  orderButton: {
    backgroundColor: '#2196f3',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default DetailsScreen
