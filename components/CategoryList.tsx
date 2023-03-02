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
    <TouchableOpacity
      onPress={() => item.id !== active?.id ? setCategory(item) : setCategory(null)}>
      <View style={[
        styles.categoryItem,
        { backgroundColor: item === active ? colors.yellow : colors.white },
      ]}>
        <Image style={styles.categoryItemImage} source={{ uri: item.image }} />
        <Text style={styles.categoryItemTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item: CategoryItem) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sizes.px5,
    marginHorizontal: sizes.px10,
  },
  categoryItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Platform.OS === 'web' ? sizes.px10 : 0,
    paddingVertical: sizes.px5,
    borderRadius: sizes.px20,
    width: Platform.OS === 'web' ? width / 6 : width / 4,
    height: Platform.OS === 'web' ? width / 6 : width / 4,
  },
  categoryItemImage: {
    width: Platform.OS === 'web' ? '70%' : '70%',
    height: Platform.OS === 'web' ? '80%' : '85%',
  },
  categoryItemTitle: {
    fontFamily: 'MontserratMedium',
    fontSize: Platform.OS === 'web' ? 16 : 12,
  }
})


