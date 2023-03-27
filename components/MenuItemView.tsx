import { MenuItem } from '../data/MenuItem'
import { Image, StyleSheet, Platform, Dimensions } from 'react-native'
import { Text, View } from '../ui/components/Themed'
import { MaterialIcons } from '@expo/vector-icons'
import colors from '../ui/colors'
import fontFamily from '../ui/fontFamily'
import Link from '../ui/components/Link'

interface Props {
  item: MenuItem
}

const { width, height } = Dimensions.get('window')

const MenuItemView = ({ item }: Props) => {

  return (
    <View key={item.id} style={styles.container}>
      <View style={styles.header} >
        <MaterialIcons name="menu-book" size={Platform.OS === 'web' ? 24 : 16} color={colors.blue} />
        <Text style={styles.orderNumberText} numberOfLines={1}>{item.id}</Text>
      </View>
      <Image style={styles.image} source={require('../assets/images/fast-food.png')} />
      <Text numberOfLines={3} style={styles.title}>{item.title}</Text>
      <Link url={`menu/${item.id}`} text='show details' />
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
    borderWidth: .5,
    borderColor: colors.yellow,
    borderRadius: 20,
  },
  image: {
    width: Platform.OS === 'web' ? window.innerHeight / 3 : width / 3,
    height: Platform.OS === 'web' ? window.innerHeight / 5 : height / 6,
    resizeMode: 'contain',
  },
  header: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.transparent,
  },
  orderNumberText: {
    flex: 1,
    marginLeft: 5,
    fontFamily: fontFamily.MontserratMedium,
    color: colors.blue,
    fontSize: Platform.OS === 'web' ? 20 : 12,
  },
  favoriteIcon: {
    alignSelf: 'flex-end', //TODO: not working on web
    color: colors.blue
  },
  title: {
    flex: 1,
    fontFamily: fontFamily.MontserratSemiBold,
    fontSize: Platform.OS === 'web' ? 20 : 14,
    marginTop: 10,
    marginBottom: 10,
  },
  showDetails: {
    padding: 10,
    borderRadius: 20,
    borderWidth: .5,
    borderColor: colors.yellow,
  },
  showDetailsText: {
    fontFamily: fontFamily.MontserratMedium,
    marginRight: 5,
    fontSize: Platform.OS === 'web' ? 16 : 14,
  }
})

export default MenuItemView
