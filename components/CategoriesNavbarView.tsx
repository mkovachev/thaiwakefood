import React, { useState } from 'react'
import { FlatList, StyleSheet, Image, TouchableOpacity, Dimensions, Platform } from 'react-native'
import { Text, View } from '../ui/components/Themed'
import { CategoryItem } from '../data/CategoryItem'
import colors from '../ui/colors'
import sizes from '../ui/sizes'
import fontFamily from '../ui/fontFamily'

interface Props {
  categories: CategoryItem[]
  onActiveCategory: (category: CategoryItem | null) => void
}

const { width } = Dimensions.get('window')
const isWeb = Platform.OS === 'web'

const CategoriesNavbarView = ({ categories, onActiveCategory }: Props) => {
  const [activeCategory, setActiveCategory] = useState<CategoryItem | null>(null)

  const handleActiveCategory = (category: CategoryItem | null) => {
    setActiveCategory(category)
    onActiveCategory(category)
  }

  const renderItem = ({ item }: { item: CategoryItem }) => (
    <TouchableOpacity
      onPress={() => item.id !== activeCategory?.id ? handleActiveCategory(item) : handleActiveCategory(null)}
      activeOpacity={0.7}
      style={[
        styles.category,
        { backgroundColor: item === activeCategory ? colors.yellow : colors.white },
      ]}>
      <Image style={styles.image} source={{ uri: item.image }} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  )

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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: sizes.px5,
    paddingVertical: sizes.px5,
    borderRadius: sizes.px20,
    width: isWeb ? width / 10 : 'auto',
    height: isWeb ? width / 10 : 100,
    minWidth: 70,
  },
  image: {
    width: isWeb ? '70%' : '60%',
    height: isWeb ? '80%' : '70%',
    resizeMode: 'contain',
    marginBottom: 5,
  },
  title: {
    fontFamily: fontFamily.MontserratMedium,
    fontSize: isWeb ? 16 : 12,
    textAlign: 'center',
  },
})

export default CategoriesNavbarView
