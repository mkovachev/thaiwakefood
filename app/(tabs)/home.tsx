import { StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import Search from '../../components/Search';
import FoodItemList from '../../components/FoodItemList';
import CategoryList from '../../components/CategoryList';

export default function HomeScreen() {


  return (
    <View style={styles.container}>
      <Search />
      <CategoryList />
      <FoodItemList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});
