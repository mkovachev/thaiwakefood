import { StyleSheet, Text, View, Image } from 'react-native'
import { FoodItemDto } from '../data/FoodItemDto'

interface Props {
  item: FoodItemDto
}

const FoodItemDetails = ({ item }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item.image }} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.detailsRow}>
          <Text style={styles.label}>Category:</Text>
          <Text style={styles.value}>{item.category}</Text>
        </View>
        {item.options && (
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Options:</Text>
            <Text style={styles.value}>
              {item.options.map((option) => option.label).join(', ')}
            </Text>
          </View>
        )}
        {item.prices && (
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Prices:</Text>
            <Text style={styles.value}>{item.prices.join(', ')}</Text>
          </View>
        )}
        {item.spicy && (
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Spicy:</Text>
            <Text style={styles.value}>{item.spicy.join(', ')}</Text>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: 200,
    width: '100%',
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  detailsContainer: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  value: {
    flex: 1,
  },
})

export default FoodItemDetails
