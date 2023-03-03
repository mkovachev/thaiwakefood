import { StyleSheet } from 'react-native'
import GridMenu from '../../components/GridMenu'
import CategoryList from '../../components/CategoryList'
import Header from '../../components/Header'
import { useGetCategoryList } from '../../hooks/getCategoryList'
import { useGetFoodItemList } from '../../hooks/getFoodItemList'
import { useState } from 'react'
import { CategoryItem } from '../../data/CategoryItem'
import { View } from '../../ui/Themed'
import SearchBar from '../../components/SearchBar'

export default function HomeScreen() {
  const { data: categories, isLoading: isLoadingCategories } = useGetCategoryList()
  const { data: foodItems, isLoading: isLoadingFoodItems } = useGetFoodItemList()
  const [activeCategory, setActiveCategory] = useState<CategoryItem | null>(null)

  if (!categories || isLoadingCategories || !foodItems || isLoadingFoodItems) return null


  return (
    <View>
      <Header />
      <CategoryList categories={categories} onActiveCategory={setActiveCategory} />
      <SearchBar items={foodItems} />
      <GridMenu data={foodItems} category={activeCategory} />
    </View>
  )
}

const styles = StyleSheet.create({})
