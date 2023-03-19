import { Feather, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { StyleSheet, Image, View, Text, Pressable } from 'react-native'
import { CartItem } from '../data/CartItem'
import colors from '../ui/colors'
import { formatInTHB } from '../utils/formatInTHB'

interface Props {
  item: CartItem
  onRemove: () => void
  onAddToCart: () => void
}

export const FavoritesView = ({ item, onRemove, onAddToCart }: Props) => {

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        {item.price && <Text style={styles.price}>Price: {formatInTHB(item.price)}</Text>}
        {item.option && <Text style={styles.option}>Option selected: {item.option}</Text>}
        {item.spicy && <Text style={styles.spicy}>{item.spicy}</Text>}
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
      </View>
      <View style={styles.actions}>
        <Link href={`menu/${item.id}`}>
          <SimpleLineIcons name="magnifier" size={24} color={colors.yellow} />
        </Link>
        <Pressable onPress={onAddToCart}>
          <Feather size={24} name="shopping-bag" color={colors.blue} />
        </Pressable>
        <Pressable onPress={onRemove}>
          <MaterialIcons name="highlight-remove" size={24} color={colors.red} />
        </Pressable>
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
  image: {
    width: 90,
    height: 80,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  title: {
    marginBottom: 5,
  },
  option: {
    marginBottom: 5,
  },
  price: {
    marginBottom: 5,
  },
  spicy: {
    marginBottom: 5,
  },
  quantity: {
  },
  actions: {
    flexDirection: 'row',
    margin: 4,
    gap: 4,
  },
})