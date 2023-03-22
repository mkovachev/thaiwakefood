import { StyleSheet } from 'react-native'
import MenuGridView from '../../components/MenuGridView'
import NavbarView from '../../components/NavbarView'
import Header from '../../components/Header'
import SearchBar from '../../components/SearchBar'
import { useEffect, useState } from 'react'
import { Category } from '../../data/Category'
import { View } from '../../ui/components/Themed'
import { categories } from '../../data/categories'
import { menu } from '../../data/menu'
import { categoryStorage, menuStorage } from '../../context/asyncStorage'


export default function HomeScreen() {
  const { store: categoriesStore } = categoryStorage
  const { store: menuStore } = menuStorage
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)

  useEffect(() => {
    if (categories) {
      categoriesStore.setAll(categories)
    }
  }, [categories])

  useEffect(() => {
    if (menu) {
      menuStore.setAll(menu)
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