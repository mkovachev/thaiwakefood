import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'
import { Text, View } from '../ui/components/Themed'
import colors from '../ui/colors'
import fontFamily from '../ui/fontFamily'
import Pressable from '../ui/components/Pressable'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Sorry, not found...</Text>
        <Pressable url='/' text='Back to Menu' />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 16
  },
  title: {
    fontFamily: fontFamily.MontserratSemiBold,
    fontSize: 20,
  },
  linkText: {
    fontFamily: fontFamily.Montserrat,
    fontSize: 14,
    color: colors.blueLight,
  },
})
