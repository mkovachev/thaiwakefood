import { Feather } from '@expo/vector-icons'
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
        <Text style={styles.orderNumberText} numberOfLines={1}>
          {item.id}
        </Text>
        <Feather
          style={styles.favoriteIcon}
          name="heart"
          size={Platform.OS === 'web' ? 28 : 18}
        />
      </View>
      <Image style={styles.image} source={{ uri: item.image }} />
      <Text numberOfLines={3} style={styles.title}>
        {item.title}
      </Text>
      <Link url={`menu/${item.id}`} text='show details' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderWidth: .3,
    borderColor: colors.yellow,
    borderStyle: 'solid',
    borderRadius: 15,
    margin: 10,
    maxWidth: Platform.OS === 'web' ? window.innerHeight / 2 : width / 2 - 20,
    height: Platform.OS === 'web' ? window.innerHeight / 3 : height / 3,
    maxHeight: 500,
  },
  image: {
    width: Platform.OS === 'web' ? window.innerHeight / 3 : width / 3,
    height: Platform.OS === 'web' ? window.innerHeight / 5 : height / 6,
    resizeMode: 'contain',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  orderNumberText: {
    flex: 1,
    marginLeft: 5,
    fontFamily: fontFamily.MontserratMedium,
    color: colors.blue,
    fontSize: Platform.OS === 'web' ? 20 : 12,
  },
  favoriteIcon: {
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
    borderRadius: 15,
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
