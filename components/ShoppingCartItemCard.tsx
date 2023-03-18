import { Feather } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { StyleSheet, Image, View, Text, TouchableOpacity, Pressable } from 'react-native'
import { ShoppingCartItem } from '../data/ShoppingCartItem'
import colors from '../ui/colors'
import { formatInTHB } from '../utils/formatInTHB'

interface Props {
  item: ShoppingCartItem
  onRemove: () => void
}

const ShoppingCartItemCard = ({ item, onRemove }: Props) => {

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        {item.price && <Text style={styles.price}>Price: {formatInTHB(item.price)}</Text>}
        {item.option && <Text style={styles.option}>Option selected: {item.option}</Text>}
        {item.spicy && <Text style={styles.spicy}>{item.spicy}</Text>}
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.more}>
          <Feather name="more-horizontal" size={24} color={colors.black} />
        </TouchableOpacity>
        <Link href={`menu/${item.id}`} style={styles.link}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    flexDirection: 'row',
    marginHorizontal: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
    borderBottomColor: colors.black5,
    borderBottomWidth: .2,
    backgroundColor: colors.white
  },
  image: {
    width: 90,
    height: 80,
    marginRight: 10,
  },
  detailsContainer: {
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
    display: 'flex',
    gap: 8,
  },
  link: {
    //width: '100%',
  },
  more: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  editButton: {
    width: '100%',
    backgroundColor: colors.yellow,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  editButtonText: {
    color: colors.white,
    textAlign: 'center',
  },
  removeButton: {
    backgroundColor: colors.red,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  removeButtonText: {
    color: colors.white,
    textAlign: 'center',
  }
})

export default ShoppingCartItemCard
