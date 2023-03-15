import { StyleSheet } from 'react-native'
import MenuGrid from '../../components/MenuGrid'
import CategoryList from '../../components/CategoryList'
import Header from '../../components/Header'
import SearchBar from '../../components/SearchBar'
import { useGetCategoryList } from '../../hooks/getCategoryList'
import { useGetFoodItemList } from '../../hooks/getFoodItemList'
import { useEffect, useState } from 'react'
import { CategoryItem } from '../../data/CategoryItem'
import { View } from '../../ui/Themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import storageKeys from '../../constants/storageKeys'


export default function HomeScreen() {
  // Step 1: Declare state variables and other non-data-fetching Hooks.
  const [activeCategory, setActiveCategory] = useState<CategoryItem | null>(null)

  // Step 2: Declare data-fetching Hooks.
  const { data: categories, isLoading: isLoadingCategories } = useGetCategoryList()
  const { data: menu, isLoading: isLoadingMenu } = useGetFoodItemList()

  // Step 3: Declare remaining Hooks that modify state or perform side-effects.
  useEffect(() => {
    if (categories && !isLoadingCategories) {
      AsyncStorage.setItem(storageKeys.CATEGORIES_KEY, JSON.stringify(categories))
    }
  }, [categories, isLoadingCategories])

  useEffect(() => {
    if (menu && !isLoadingMenu) {
      AsyncStorage.setItem(storageKeys.MENU_KEY, JSON.stringify(menu))
    }
  }, [menu, isLoadingMenu])

  if (!categories || isLoadingCategories || !menu || isLoadingMenu) {
    return null
  }

  return (
    <View style={styles.container}>
      <Header />
      <CategoryList categories={categories} onActiveCategory={setActiveCategory} />
      <SearchBar items={menu} />
      <MenuGrid data={menu} category={activeCategory} />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
})