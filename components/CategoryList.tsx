import React, { useState } from 'react'
import { FlatList, StyleSheet, Image, TouchableOpacity, Dimensions, Platform } from 'react-native'
import { Text, View } from '../ui/Themed'
import { CategoryItem } from '../data/CategoryItem'
import colors from "../ui/colors"
import sizes from '../ui/sizes'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Props {
  categories: CategoryItem[]
  setActiveCategory: (category: CategoryItem | null) => void
}

const { width } = Dimensions.get('window')

export default function CategoryList({ categories, setActiveCategory }: Props) {
  const [active, setActive] = useState<CategoryItem | null>(null)

  const setCategory = (category: CategoryItem | null) => {
    setActive(category)
    setActiveCategory(category)
  }

  const renderCategoryItem = ({ item }: { item: CategoryItem }) => (
    <View style={[
      styles.item,
      { backgroundColor: item === active ? colors.yellow : colors.white },
    ]}>
      <TouchableOpacity
        onPress={() => item.id !== active?.id ? setCategory(item) : setCategory(null)}>
        <Image style={styles.image} source={{ uri: item.image }} />
      </TouchableOpacity>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item: CategoryItem) => item.id.toString()}
        horizontal
      //showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: sizes.px5,
    marginHorizontal: sizes.px10,
  },
  item: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Platform.OS === 'web' ? sizes.px10 : 0,
    paddingVertical: sizes.px5,
    borderRadius: sizes.px20,
    width: Platform.OS === 'web' ? width / 6 : 100,
    height: Platform.OS === 'web' ? width / 6 : 100,
  },
  image: {
    width: Platform.OS === 'web' ? '70%' : '70%',
    height: Platform.OS === 'web' ? '80%' : '85%',
  },
  title: {
    fontFamily: 'MontserratMedium',
    fontSize: Platform.OS === 'web' ? 16 : 12,
  }
})


