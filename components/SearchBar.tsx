import React, { useState } from 'react'
import { TextInput, StyleSheet, Platform } from 'react-native'
import { MenuItem } from '../data/MenuItem'
import colors from '../ui/colors'
import fontFamily from '../ui/fontFamily'
import MenuGridView from './MenuGridView'

interface Props {
  items: MenuItem[]
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
      {searchInput && <MenuGridView data={filteredItems} />}
    </>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  textInput: {
    fontFamily: fontFamily.MontserratMedium,
    fontSize: Platform.OS === 'web' ? 22 : 16,
    width: Platform.OS === 'web' ? '50%' : '95%',
    height: Platform.OS === 'web' ? 40 : 40,
    margin: 10,
    padding: 10,
    color: colors.grey,
    borderRadius: 15,
    borderWidth: .5,
    borderColor: colors.grey,
  }
})