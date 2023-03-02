import { ScrollView, StyleSheet } from 'react-native'
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
    <ScrollView>
      <Header />
      <CategoryList categories={categories} setActiveCategory={setActiveCategory} />
      <Search />
      <FoodItemList items={foodItems} category={activeCategory} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({})
