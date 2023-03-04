import React, { useState } from "react"
import { FoodItemDto } from "../data/FoodItemDto"
import { StyleSheet, Image } from "react-native"
import { RadioButton } from "react-native-paper"
import { View, Text } from "../ui/Themed"
import colors from '../ui/colors'

type Props = {
  item: FoodItemDto
}

const FoodItemDetails = ({ item }: Props) => {
  const [selectedOption, setSelectedOption] = useState("")

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.description}>{item.description}</Text>

        {item.options && item.options.length > 0 ? (
          <View style={styles.optionsContainer}>
            {item.options.map((option, index) => (
              <View key={`${item.id}-${option.value}`} style={styles.optionContainer}>
                <RadioButton
                  value={option.label}
                  status={selectedOption === option.label ? "checked" : "unchecked"}
                  color={colors.yellow}
                  uncheckedColor={colors.blue}
                  onPress={() => setSelectedOption(option.label)}
                />
                <Text style={styles.optionLabel}>{option.label}</Text>
                <Text style={styles.optionValue}>{option.value}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.pricesContainer}>
            {item.prices?.map((price, index) => (
              <Text key={`${item.id}-${index}`} style={styles.prices}>
                ${price}
              </Text>
            ))}
          </View>
        )}

        {item.spicy && item.spicy.length > 0 && (
          <View style={styles.spicyContainer}>
            <Text style={styles.spicyLabel}>Spicy:</Text>
            {item.spicy.map((level, index) => (
              <Text key={`${item.id}-${level}`} style={styles.spicy}>
                {level}
              </Text>
            ))}
          </View>
        )}
      </View>
    </View>
  )
}

export default FoodItemDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  image: {
    height: 200,
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.grey,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  optionsContainer: {
    marginTop: 16,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  optionLabel: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  optionValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  pricesContainer: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  prices: {
    fontSize: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  spicyContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  spicyLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  spicy: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    color: '#888',
  },
})