import React, { useState } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { FoodItemDto } from '../data/FoodItemDto'
import colors from '../ui/colors'
import GridMenu from './GridMenu'

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
      {searchInput && <GridMenu data={filteredItems} />}
    </>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  textInput: {
    fontFamily: 'MontserratSemiBold',
    height: 40,
    margin: 10,
    padding: 10,
    color: colors.grey,
    borderRadius: 15,
  }
})