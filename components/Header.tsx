import { View, Text } from "../ui/Themed"
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Feather } from "@expo/vector-icons"
import colors from "../ui/colors"
import { useState } from 'react'
import fontFamily from '../ui/fontFamily'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuItems = ['My Account', 'About', 'Contact'];

  return (
    <View style={styles.container}>
      <View style={styles.containerLogoTitle}>
        <Image
          style={styles.logo}
          source={{ uri: '../assets/images/logoTWP.png' }}
        />
        <Text style={styles.title}>THAI WAKE PARK - TWP Lumlukka</Text>
      </View>
      <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)}>
        <Feather name={isMenuOpen ? 'x' : 'menu'} size={24} color={colors.blue} />
      </TouchableOpacity>
      {isMenuOpen && (
        <View style={styles.menu}>
          {menuItems.map((item, index) => (
            <Text key={index} style={styles.menuItem}>
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
    fontFamily: fontFamily.MontserratBold,
    marginHorizontal: 10,
  },
  menu: {
    position: 'absolute',
    zIndex: 1,
    top: 70,
    right: 20,
    elevation: 5,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  menuItem: {
    marginVertical: 5,
    fontSize: 16,
    color: colors.blue
  },
})