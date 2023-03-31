import { MenuItem } from '../data/MenuItem'
import { Image, StyleSheet, Platform, Dimensions } from 'react-native'
import { Text, View } from '../ui/components/Themed'
import { MaterialIcons } from '@expo/vector-icons'
import colors from '../ui/colors'
import fontFamily from '../ui/fontFamily'
import Pressable from '../ui/components/Pressable'

interface Props {
  item: MenuItem
}

const { width, height } = Dimensions.get('window')

const MenuItemGridView = ({ item }: Props) => {

  return (
    <View key={item.id} style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="menu-book" size={18} color={colors.blueLight} />
        <Text style={styles.orderNumber} numberOfLines={1}>{item.id}</Text>
      </View>
      <Image style={styles.image} source={require('../assets/images/fast-food.png')} />
      <Text style={styles.name} numberOfLines={3}>{item.name}</Text>
      <Pressable url={`menu/${item.id}`} text='show details' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    maxHeight: 600,
    height: height / 3,
    maxWidth: Platform.OS === 'web' ? window.innerHeight / 2 : width / 2 - 20,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.yellow,
    borderRadius: 20,
  },
  header: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.transparent,
  },
  image: {
    width: Platform.OS === 'web' ? window.innerHeight / 3 : width / 3,
    height: Platform.OS === 'web' ? window.innerHeight / 5 : height / 6,
    resizeMode: 'contain',
  },
  orderNumber: {
    marginLeft: 5,
    fontFamily: fontFamily.MontserratSemiBold,
    color: colors.blueLight,
  },
  name: {
    flex: 1,
    fontFamily: fontFamily.MontserratSemiBold,
    fontSize: Platform.OS === 'web' ? 20 : 14,
    margin: 5
  },
})

export default MenuItemGridView
