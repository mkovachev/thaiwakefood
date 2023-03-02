import { View, Text } from "./Themed"
import { StyleSheet, Image } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"
import colors from "../ui/colors"

export default function Header() {

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.containerLogoTitle}>
          <Image
            style={styles.logo}
            source={{ uri: './assets/images/logoTWP.png' }}
          />
          <Text style={styles.title}>THAI WAKE PARK - TWP Lumlukka</Text>
        </View>
        <View>
          <Feather style={styles.menu} name="menu" size={24} color={colors.black} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  containerLogoTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontFamily: 'MontserratBold',
    marginHorizontal: 10,
  },
  menu: {
    justifyContent: 'flex-end'
  }
})