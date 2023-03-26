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

  const filteredData = menuItems.filter((item) => {
    const hasSearchTerm = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    const hasActiveCategory = activeCategory && item.category === activeCategory.title
    return hasSearchTerm && hasActiveCategory
  })


  return (
    <View style={styles.container}>
      <Header />
      <NavbarView categories={categories} onActiveCategory={setActiveCategory} />
      <SearchBar onSearch={handleSearch} />
      <MenuGridView data={filteredData} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
})