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
import { useRecoilState } from 'recoil'
import { categoriesAtom, menuAtom } from '../../context/recoil'
import { categoriesStore, menuStore } from '../../context/store'


export default function HomeScreen() {
  const [menuItems, setMenuItems] = useRecoilState(menuAtom)
  const [categoryItems, setCategoryItems] = useRecoilState(categoriesAtom)
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)

  useEffect(() => {
    if (categories) {
      setCategoryItems(categories)
      //categoriesStore.setAll(categories)
    }
  }, [categories])

  useEffect(() => {
    if (menu) {
      setMenuItems(menu)
      //menuStore.setAll(menu)
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