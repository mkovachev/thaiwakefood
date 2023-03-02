import { ScrollView, StyleSheet } from 'react-native'
import { View } from '../../ui/Themed'
import Search from '../../components/Search'
import FoodItemList from '../../components/FoodItemList'
import CategoryList from '../../components/CategoryList'
import Header from '../../components/Header'
import { useGetCategoryList } from '../../hooks/getCategoryList'
import { useGetFoodItemList } from '../../hooks/getFoodItemList'
import { useState } from 'react'
import { CategoryItem } from '../../data/CategoryItem'

export default function HomeScreen() {
  const { data: categories, isLoading: isLoadingCategories } = useGetCategoryList()
  const { data: foodItems, isLoading: isLoadingFoodItems } = useGetFoodItemList()
  const [activeCategory, setActiveCategory] = useState<CategoryItem | null>(null)

  if (!categories || isLoadingCategories || !foodItems || isLoadingFoodItems) return null

  return (
    <View style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}>
        <Header />
        <CategoryList categories={categories} setActiveCategory={setActiveCategory} />
        <Search />
        <FoodItemList foodItems={foodItems} category={activeCategory} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
