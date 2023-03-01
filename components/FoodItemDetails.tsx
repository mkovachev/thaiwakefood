import { StatusBar } from 'expo-status-bar'
import { Modal, Platform, StyleSheet, Image } from 'react-native'
import { Text, View } from './Themed'
import colors from "../constants/colors"
import { FoodItem } from '../data/FoodItem'
import { useState } from 'react'

interface FoodItemDetailsProps {
  foodItem: FoodItem
  visible: boolean
}

export default function FoodItemDetails({ foodItem, visible }: FoodItemDetailsProps) {
  const [, setVisible] = useState(visible)


  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible);
      }}>
      <View style={styles.container}>
        <Image style={styles.foodItemImage} source={{ uri: foodItem.image }} />
        <Text style={styles.foodItemTitle}>{foodItem.title}</Text>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  foodItemImage: {
    width: 300,
    height: 300,
  },
  foodItemTitle: {
    fontFamily: 'MontserratMedium',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  }
})
