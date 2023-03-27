import { MaterialIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { TextInput, StyleSheet, Platform } from 'react-native'
import colors from '../ui/colors'
import { View } from '../ui/components/Themed'
import fontFamily from '../ui/fontFamily'

interface Props {
  onSearch: (searchTerm: string) => void
}

const SearchBar = ({ onSearch }: Props) => {
  const [text, setText] = useState('')

  const handleChange = (text: string) => {
    setText(text)
    onSearch(text)
  }

  const handleClear = () => {
    setText('')
    onSearch('')
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder='Search...'
        value={text}
        onChangeText={handleChange}
        // clearButtonMode='while-editing'
        // clearTextOnFocus={true}
      />
      {text !== '' &&
        <View>
          <MaterialIcons
            style={styles.clearButton}
            name="clear"
            size={24}
            color={colors.red}
            onPress={handleClear}
          />
        </View>
      }
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
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
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    padding: 20
  },
})