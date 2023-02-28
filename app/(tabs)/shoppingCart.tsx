import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import colors from '../../constants/colors';

export default function ShoppingCartScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping cart</Text>
      <View style={styles.separator} lightColor={colors.grey} darkColor={colors.black} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
