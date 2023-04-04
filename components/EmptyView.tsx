import fontFamily from '../ui/fontFamily'
import { View, Text } from '../ui/components/Themed'
import { Platform, StyleSheet } from 'react-native'
import Pressable from '../ui/components/Pressable'

export const EmptyView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.noItemsText}>No items found</Text>
      <Pressable url='/' text='Back to Menu' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'web' ? '20%' : '60%',
    gap: 16
  },
  noItemsText: {
    fontFamily: fontFamily.MontserratMedium,
    fontSize: Platform.OS === 'web' ? 20 : 16,
  },
})
