import { Feather } from '@expo/vector-icons'
import { FoodItemDto } from '../data/FoodItemDto'
import { Image, StyleSheet, Platform, Dimensions } from 'react-native'
import { Text, View } from '../ui/Themed'
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router'
import colors from '../ui/colors'

interface Props {
  item: FoodItemDto
}

const { width, height } = Dimensions.get('window');

const FoodItemCard = ({ item }: Props) => {

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
      <Link href={`menu/${item.id}`} style={styles.showDetails}>
        <Text style={styles.showDetailsText}>show details</Text>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderWidth: .2,
    borderColor: colors.yellow,
    borderStyle: 'solid',
    borderRadius: 20,
    margin: 10,
    width: '100%',
    maxWidth: 600,
    height: Platform.OS === 'web' ? window.innerHeight / 3 : height / 3,
    maxHeight: 400,
  },
  image: {
    width: Platform.OS === 'web' ? window.innerHeight / 6 : width / 3,
    height: Platform.OS === 'web' ? window.innerHeight / 6 : height / 6,
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
    fontFamily: 'MontserratMedium',
    color: colors.blue,
    fontSize: Platform.OS === 'web' ? 20 : 12,
  },
  favoriteIcon: {
    color: colors.blue
  },
  title: {
    flex: 1,
    alignSelf: 'center',
    fontFamily: 'MontserratSemiBold',
    fontSize: Platform.OS === 'web' ? 24 : 14,
    marginTop: 10,
    marginBottom: 10,
  },
  showDetails: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.yellow,
    borderStyle: 'solid',
  },
  showDetailsText: {
    fontFamily: 'MontserratMedium',
    marginRight: 5,
    fontSize: Platform.OS === 'web' ? 16 : 14,
  }
})

export default FoodItemCard
