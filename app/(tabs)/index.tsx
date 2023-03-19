import { StyleSheet } from 'react-native'
import MenuGridView from '../../components/MenuGridView'
import CategoriesNavbarView from '../../components/CategoriesNavbarView'
import Header from '../../components/Header'
import SearchBar from '../../components/SearchBar'
import { useGetCategoryList } from '../../hooks/getCategoryList'
import { useGetMenu } from '../../hooks/getMenu'
import { useEffect, useState } from 'react'
import { CategoryItem } from '../../data/CategoryItem'
import { View } from '../../ui/components/Themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import storageKeys from '../../constants/storageKeys'


export default function HomeScreen() {
  // state variables and non-data-fetching Hooks
  const [activeCategory, setActiveCategory] = useState<CategoryItem | null>(null)

  // data-fetching hooks
  const { data: categories, isLoading: isLoadingCategories } = useGetCategoryList()
  const { data: menu, isLoading: isLoadingMenu } = useGetMenu()

  // hooks that modify state
  useEffect(() => {
    if (categories && !isLoadingCategories) {
      AsyncStorage.setItem(storageKeys.categories, JSON.stringify(categories))
    }
  }, [categories, isLoadingCategories])

  useEffect(() => {
    if (menu && !isLoadingMenu) {
      AsyncStorage.setItem(storageKeys.menu, JSON.stringify(menu))
    }
  }, [menu, isLoadingMenu])

  if (!categories || isLoadingCategories || !menu || isLoadingMenu) {
    return null
  }

  return (
    <View style={styles.container}>
      <Header />
      <CategoriesNavbarView categories={categories} onActiveCategory={setActiveCategory} />
      <SearchBar items={menu} />
      <MenuGridView data={menu} category={activeCategory} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
})