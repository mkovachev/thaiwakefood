import { Feather, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { StyleSheet, Image, View, Text, Pressable } from 'react-native'
import { SelectedItem } from '../data/SelectedItem'
import colors from '../ui/colors'
import { formatInTHB } from '../utils/formatInTHB'

interface Props {
  item: SelectedItem
  onRemove: () => void
  onAddToCart?: () => void
}

export const SelectedItemView = ({ item, onRemove, onAddToCart }: Props) => {

  return (
    <View style={styles.container}>
      <Link style={styles.link} href={`menu/${item.id}`}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
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

        {item.isFavorite &&
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
    overflow: 'hidden'
  },
  image: {
    width: 90,
    height: 80,
    marginRight: 10,
    overflow: 'hidden'
  },
  details: {
    flex: 1,
    gap: 5
  },
})