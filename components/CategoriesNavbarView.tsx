import React, { useState } from 'react'
import { FlatList, StyleSheet, Image, TouchableOpacity, Dimensions, Platform } from 'react-native'
import { Text, View } from '../ui/Themed'
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
        styles.itemContainer,
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
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    marginHorizontal: 5,
    overflow: isWeb ? 'scroll' : undefined,
    minHeight: 100,
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  itemContainer: {
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
    maxWidth: '100%',
  },
})

export default CategoriesNavbarView
