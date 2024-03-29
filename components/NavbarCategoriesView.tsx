import React, { useState } from 'react'
import { FlatList, StyleSheet, Image, TouchableOpacity, Dimensions, Platform } from 'react-native'
import { Text, View } from '../ui/components/Themed'
import { Category } from '../data/Category'
import colors from '../ui/colors'
import fontFamily from '../ui/fontFamily'

interface Props {
  categories: Category[]
  onActiveCategory: (category: Category | null) => void
}

const { width } = Dimensions.get('window')
const isWeb = Platform.OS === 'web'

const NavbarCategoriesView = ({ categories, onActiveCategory }: Props) => {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)

  const handleActiveCategory = (category: Category | null) => {
    setActiveCategory(category)
    onActiveCategory(category)
  }

  const renderItem = ({ item }: { item: Category }) => {

    return (
      <TouchableOpacity
        onPress={() => item.id !== activeCategory?.id ? handleActiveCategory(item) : handleActiveCategory(null)}
        activeOpacity={0.7}
        style={[
          styles.category,
          { backgroundColor: item === activeCategory ? colors.yellow : colors.white },
        ]}>
        <Image style={styles.image} source={require('../assets/images/fast-food.png')} />
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
    )
  }


  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: isWeb ? 'scroll' : undefined,
  },
  category: {
    alignItems: 'center',
    marginHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 15,
    width: isWeb ? width / 10 : 'auto',
    height: isWeb ? width / 10 : width / 3,
    minWidth: 70,
  },
  image: {
    width: '100%',
    height: '90%',
    resizeMode: 'contain',
  },
  name: {
    fontFamily: fontFamily.MontserratMedium,
    fontSize: isWeb ? 16 : 12,
  },
})

export default NavbarCategoriesView
