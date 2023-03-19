import colors from '../ui/colors'
import fontFamily from '../ui/fontFamily'
import { View, Text } from '../ui/components/Themed'
import { Platform, StyleSheet } from 'react-native'
import Link from '../ui/components/Link'

export const EmptyView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.noItemsText}>No items added yet</Text>
      <Link url='' text='go home' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    gap: 16
  },
  link: {
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.yellow,
    borderStyle: 'solid',
  },
  linkText: {
    fontFamily: fontFamily.MontserratMedium,
    marginRight: 5,
    fontSize: Platform.OS === 'web' ? 16 : 14,
  },
  noItemsText: {
    fontFamily: fontFamily.MontserratMedium,
    fontSize: 20,
    color: colors.blue,
  },
})
