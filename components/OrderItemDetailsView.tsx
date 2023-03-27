import { Link } from 'expo-router'
import { StyleSheet, Image } from 'react-native'
import { CartItem } from '../data/CartItem'
import colors from '../ui/colors'
import { View, Text } from '../ui/components/Themed'
import fontFamily from '../ui/fontFamily'
import { formatInTHB } from '../utils/formatInTHB'

interface Props {
  item: CartItem
}

export const OrderItemDetailsView = ({ item }: Props) => {

  return (
    <View style={styles.container}>
      <Link href={`menu/${item.id}`}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../assets/images/fast-food.png')} />
        </View>
      </Link>
      <View style={styles.details}>
        <Text>{item.title}</Text>
        {item.option && <Text>Option: {item.option}</Text>}
        {item.spicy && <Text>Spicy: Yes</Text>}
        <Text>Price: {formatInTHB(item.price)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    borderRadius: 10,
    borderBottomColor: colors.blue,
    borderBottomWidth: .1,
  },
  link: {
  },
  imageContainer: {
    alignItems: 'center',
    width: 100,
    height: 100,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  details: {
    flex: 1,
    marginLeft: 15,
    gap: 8
  },
  quantity: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  quantityText: {
    fontFamily: fontFamily.MontserratMedium,
    fontSize: 16
  }
})