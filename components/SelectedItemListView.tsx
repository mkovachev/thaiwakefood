import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { StyleSheet, Image } from 'react-native'
import { CartItem } from '../data/CartItem'
import colors from '../ui/colors'
import { View, Text } from '../ui/components/Themed'
import fontFamily from '../ui/fontFamily'
import { formatInTHB } from '../utils/formatInTHB'
import Pressable from '../ui/components/Pressable'

interface Props {
  item: CartItem
  onRemove: () => void
  onAddToCart?: () => void
  onAmountChange: (newAmount: number) => void
  inCart?: boolean
}

export const SelectedItemListView = ({ item, onRemove, onAddToCart, onAmountChange, inCart }: Props) => {

  return (
    <View style={styles.container}>
      <Link href={`menu/${item.id}`}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../assets/images/fast-food.png')} />
        </View>
      </Link>
      <View style={styles.details}>
        <Text>{item.name}</Text>
        {item.option && <Text>Option: {item.option}</Text>}
        {item.spicy && <Text>Spicy: Yes</Text>}
        <Text>Price: {formatInTHB(item.price)}</Text>
        <View style={styles.containerQuantity}>
          <Pressable onPress={() => onAmountChange(item.quantity - 1)}
            icon={<AntDesign name="leftcircleo" size={24} />}
          />
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <Pressable onPress={() => onAmountChange(item.quantity + 1)}
            icon={<AntDesign name="rightcircleo" size={24} />} />
        </View>
      </View>
      <View style={styles.actions}>
        <Pressable
          style={{ flex: 1 }}
          onPress={onRemove}
          icon={<MaterialIcons name="highlight-remove" size={24} color={colors.red} />} />
        {!inCart &&
          <Pressable
            onPress={onAddToCart}
            icon={<Feather size={24} name="shopping-bag" />} />
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
    borderBottomColor: colors.blueLight,
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
  containerQuantity: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quantityText: {
    fontFamily: fontFamily.MontserratMedium,
    fontSize: 16,
    color: colors.blueLight
  },
  actions:{
    //display: 'flex',
    //flexDirection: 'row',
    justifyContent: 'space-between',
  }
})