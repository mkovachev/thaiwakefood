import { ScrollView, StyleSheet } from 'react-native'
import { View } from '../../components/Themed'
import Search from '../../components/Search'
import FoodItemList from '../../components/FoodItemList'
import CategoryList from '../../components/CategoryList'
import Header from '../../components/Header'
import { useGetCategoryList } from '../../hooks/getCategoryList'
import { useGetFoodItemList } from '../../hooks/getFoodItemList'

export default function HomeScreen() {
  const { data: categories, isLoading: isLoadingCategories } = useGetCategoryList()
  const { data: foodItems, isLoading: isLoadingFoodItems } = useGetFoodItemList()

  if (!categories || isLoadingCategories || !foodItems || isLoadingFoodItems) return null
  
  return (
    <View style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}>
        <Header />
        <CategoryList categories={categories} />
        <Search />
        <FoodItemList foodItems={foodItems} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
