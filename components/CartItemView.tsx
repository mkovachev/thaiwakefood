import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { StyleSheet, Image, View, Text, Pressable } from 'react-native'
import { CartItem } from '../data/CartItem'
import colors from '../ui/colors'
import fontFamily from '../ui/fontFamily'
import { formatInTHB } from '../utils/formatInTHB'

interface Props {
  item: CartItem
  onRemove: () => void
  onAddToCart?: () => void
  onAmountChange: (newAmount: number) => void
  isInFavorites?: boolean
}

export const CartItemView = ({ item, onRemove, onAddToCart, onAmountChange, isInFavorites }: Props) => {

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
        <View style={styles.quantity}>
          <Pressable onPress={() => onAmountChange(item.amount - 1)}>
            <AntDesign name="leftcircleo" size={20} color="black" />
          </Pressable>
          <Text style={styles.quantityText}>{item.amount}</Text>
          <Pressable onPress={() => onAmountChange(item.amount + 1)}>
            <AntDesign name="rightcircleo" size={20} color="black" />
          </Pressable>
        </View>
      </View>
      <View>
        <Pressable onPress={onRemove} style={{ flex: 1 }}>
          <MaterialIcons name="highlight-remove" size={24} color={colors.red} />
        </Pressable>
        {isInFavorites &&
          <Pressable onPress={onAddToCart}>
            <Feather size={24} name="shopping-bag" color={colors.blue} />
          </Pressable>
        }
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