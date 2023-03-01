import { StyleSheet } from 'react-native'
import { Text, View } from '../../components/Themed'

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 20,
    marginHorizontal: 20,
    marginVertical: 20
  },
})
