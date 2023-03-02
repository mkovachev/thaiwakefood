import { Feather } from "@expo/vector-icons"
import { Platform, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from "../ui/colors"
import sizes from '../ui/sizes'
import { View, Text } from '../ui/Themed'

export default function Search() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Feather name='search' size={24} color={colors.black} />
        <View style={styles.search}>
          <Text style={styles.searchText}>Search...</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: sizes.px5,
    marginHorizontal: sizes.px20,
    marginVertical: Platform.OS === 'web' ? sizes.px30 : 0,
  },
  search: {
    flex: 1,
    marginLeft: 10,
    borderBottomColor: colors.grey,
    borderBottomWidth: 1
  },
  searchText: {
    fontFamily: 'MontserratSemiBold',
    fontSize: Platform.OS === 'web' ? 24 : 14,
    marginBottom: sizes.px5,
    color: colors.grey
  }
})