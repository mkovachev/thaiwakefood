import { StyleSheet } from 'react-native'
import MenuGridView from '../../components/MenuGridView'
import NavbarCategoriesView from '../../components/NavbarCategoriesView'
import Header from '../../components/Header'
import SearchBar from '../../components/SearchBar'
import { useEffect, useState } from 'react'
import { Category } from '../../data/Category'
import { View } from '../../ui/components/Themed'
import { categories } from '../../data/categories'
import { menu } from '../../data/menu'
import { useRecoilState } from 'recoil'
import { categoriesAtom, menuAtom } from '../../context/recoil'

export default function HomeScreen() {
  const [menuItems, setMenuItems] = useRecoilState(menuAtom)
  const [categoryItems, setCategoryItems] = useRecoilState(categoriesAtom)
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (categories) {
      setCategoryItems(categories)
    }
  }, [categories])

  useEffect(() => {
    if (menu) {
      setMenuItems(menu)
    }
  }, [menu])

  if (!categories || !menu) {
    return null
  }

  const handleSearch = (text: string) => {
    setSearchTerm(text)
  }

  const filteredMenu = menuItems
    .filter(item => activeCategory ? item.category === activeCategory.title : true)
    .filter(item => searchTerm ? item.title.toLowerCase().includes(searchTerm.toLowerCase()) : true)

  return (
    <View style={styles.container}>
      <Header />
      <NavbarCategoriesView categories={categories} onActiveCategory={setActiveCategory} />
      <SearchBar onSearch={handleSearch} />
      <MenuGridView data={filteredMenu} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})