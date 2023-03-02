import React, { useState } from 'react'
import { FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Text, View } from './Themed'
import { CategoryItem } from '../data/CategoryItem'
import colors from "../ui/colors"
import shapes from '../ui/shapes'

interface Props {
  categories: CategoryItem[]
  setActiveCategory: (category: CategoryItem) => void
}

export default function CategoryList({ categories, setActiveCategory }: Props) {
  const [active, setActive] = useState<CategoryItem | null>(null)

  const renderCategoryItem = ({ item }: { item: CategoryItem }) => (
    <TouchableOpacity onPress={() => { setActive(item), setActiveCategory(item) }}>
      <View style={[
        styles.categoryItem,
        {
          backgroundColor: item === active ? colors.yellow : colors.white,
        },
      ]}>
        <Image style={styles.categoryItemImage} source={{ uri: item.image }} />
        <Text style={styles.categoryItemTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.categoriesList}>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item: CategoryItem) => item.id.toString()}
            horizontal={true}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  categoriesList: {
    paddingHorizontal: 5
  },
  categoryItem: {
    backgroundColor: colors.white,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: shapes.borderRadius20,
  },
  categoryItemImage: {
    width: 60,
    height: 60,
  },
  categoryItemTitle: {
    fontFamily: 'MontserratMedium',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  }
})


