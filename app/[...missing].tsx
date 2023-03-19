import { Link, Stack } from 'expo-router'
import { StyleSheet } from 'react-native'
import { Text, View } from '../ui/components/Themed'
import colors from '../ui/colors'
import fontFamily from '../ui/fontFamily'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Sorry, not found...</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>return home</Text>
        </Link>
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
  },
  title: {
    fontFamily: fontFamily.MontserratSemiBold,
    fontSize: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontFamily: fontFamily.Montserrat,
    fontSize: 14,
    color: colors.blue,
  },
})
