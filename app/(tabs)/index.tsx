import { StyleSheet } from 'react-native'
import MenuGridView from '../../components/MenuGridView'
import NavbarView from '../../components/NavbarView'
import Header from '../../components/Header'
import SearchBar from '../../components/SearchBar'
import { useEffect, useState } from 'react'
import { CategoryItem } from '../../data/CategoryItem'
import { View } from '../../ui/components/Themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import storageKeys from '../../constants/storageKeys'
import { categories } from '../../data/categories'
import { menu } from '../../data/menu'


export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState<CategoryItem | null>(null)

  useEffect(() => {
    if (categories) {
      AsyncStorage.setItem(storageKeys.categories, JSON.stringify(categories))
    }
  }, [categories])

  useEffect(() => {
    if (menu) {
      AsyncStorage.setItem(storageKeys.menu, JSON.stringify(menu))
    }
  }, [menu])

  if (!categories || !menu) {
    return null
  }

  return (
    <View style={styles.container}>
      <Header />
      <NavbarView categories={categories} onActiveCategory={setActiveCategory} />
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