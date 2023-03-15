import React, { useState } from 'react'
import { TextInput, StyleSheet, Platform } from 'react-native'
import { FoodItemDto } from '../data/FoodItemDto'
import colors from '../ui/colors'
import MenuGrid from './MenuGrid'

interface Props {
  items: FoodItemDto[]
}

const SearchBar = ({ items }: Props) => {
  const [searchInput, setSearchInput] = useState('')

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchInput.toLowerCase())
  )

  return (
    <>
      <TextInput
        style={styles.textInput}
        onChangeText={setSearchInput}
        value={searchInput}
        placeholder="Search..."
      />
      {searchInput && <MenuGrid data={filteredItems} />}
    </>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  textInput: {
    fontFamily: 'MontserratMedium',
    fontSize: Platform.OS === 'web' ? 26 : 16,
    width: Platform.OS === 'web' ? '50%' : '90%',
    height: Platform.OS === 'web' ? 50 : 40,
    marginHorizontal: 30,
    marginVertical: 10,
    padding: 10,
    color: colors.grey,
    borderRadius: 15,
    borderWidth: .5,
    borderColor: colors.yellow,
    borderStyle: 'solid',
  }
})