import { View, Text } from "../ui/Themed"
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"
import colors from "../ui/colors"
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuItems = ['My Account', 'About', 'Contact'];

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerLogoTitle}>
        <Image
          style={styles.logo}
          source={{ uri: '../assets/images/logoTWP.png' }}
        />
        <Text style={styles.title}>THAI WAKE PARK - TWP Lumlukka</Text>
      </View>
      <TouchableOpacity onPress={toggleMenu}>
        <Feather name={isMenuOpen ? 'x' : 'menu'} size={24} color={colors.blue} />
      </TouchableOpacity>
      {isMenuOpen && (
        <View style={styles.menu}>
          {menuItems.map((item) => (
            <Text key={item} style={styles.menuItem}>
              {item}
            </Text>
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    elevation: 5,
  },
  containerLogoTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontFamily: 'MontserratBold',
    marginHorizontal: 10,
  },
  menu: {
    position: 'absolute',
    top: 70,
    right: 20,
    elevation: 5,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.blue,
  },
  menuItem: {
    marginVertical: 5,
    fontSize: 16,
  },
})