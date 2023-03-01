import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';

export default function ShoppingCartScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping cart</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginVertical: 20
  },
})
