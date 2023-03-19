import { Feather, MaterialIcons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { StyleSheet, Image, View, Text, Pressable } from 'react-native'
import { SelectedItem } from '../data/SelectedItem'
import colors from '../ui/colors'
import { formatInTHB } from '../utils/formatInTHB'

interface Props {
  item: SelectedItem
  onRemove: () => void
  onAddToCart?: () => void
  isInFavorites?: boolean
}

export const SelectedItemView = ({ item, onRemove, onAddToCart, isInFavorites }: Props) => {

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
        <Text>Quantity: {item.quantity}</Text>
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
    marginRight: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  details: {
    flex: 1,
    gap: 5
  },
})