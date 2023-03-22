import { StyleSheet } from 'react-native'
import MenuGridView from '../../components/MenuGridView'
import NavbarView from '../../components/NavbarView'
import Header from '../../components/Header'
import SearchBar from '../../components/SearchBar'
import { useEffect, useState } from 'react'
import { CategoryItem } from '../../data/CategoryItem'
import { View } from '../../ui/components/Themed'
import { categories } from '../../data/categories'
import { menu } from '../../data/menu'
import { menu as menuStorage, categories as categoriesStorage } from '../../context/mmkv'


export default function HomeScreen() {
  const { operations: categoriesStore } = categoriesStorage
  const { operations: menuStore } = menuStorage
  const [activeCategory, setActiveCategory] = useState<CategoryItem | null>(null)

  useEffect(() => {
    if (categories) {
      categoriesStore.setItems(categories)
    }
  }, [categories])

  useEffect(() => {
    if (menu) {
      menuStore.setItems(menu)
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