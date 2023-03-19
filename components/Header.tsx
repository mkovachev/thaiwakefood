import { View, Text } from "../ui/components/Themed"
import { StyleSheet, Image } from 'react-native'
import fontFamily from '../ui/fontFamily'

export default function Header() {

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/images/logoTWP.png')}
      />
      <Text style={styles.title}>THAI WAKE PARK - TWP Lumlukka</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: {
    fontFamily: fontFamily.MontserratBold,
    marginHorizontal: 10,
  },
})