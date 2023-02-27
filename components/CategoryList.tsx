import React from 'react';
import { FlatList, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Text, View } from './Themed';
import { useGetCategoryList } from '../hooks/getCategoryList';
import { CategoryItem } from '../data/CategoryItem';


export default function CategoryList({ path }: { path: string }) {
  const { data: categories, isLoading: isLoadingCategories } = useGetCategoryList()

  if (!categories || isLoadingCategories) {
    return null
  }

  const renderCategoryItem = ({ item }: { item: CategoryItem }) => (
    <View>
      <Image style={styles.categoryItemImage} source={item.image as ImageSourcePropType} />
      <Text>{item.title}</Text>
    </View>
  )

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.categoryList}>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item: CategoryItem) => item.id.toString()}
            horizontal={true}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    fontFamily: 'MontserratBold',
    fontSize: 16,
    paddingHorizontal: 20
  },
  categoryList: {

  },
  categoryItemImage: {

  },
  foodItemList: {

  }
});


