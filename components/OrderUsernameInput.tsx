import { TextInput } from 'react-native-paper'
import { View, Text } from '../ui/components/Themed'
import { StyleSheet } from 'react-native'
import colors from '../ui/colors'
import { useState } from 'react'

interface Props {
  user: string
  onUserChange: (user: string) => void
}

export const OrderUsernameInput = ({ user, onUserChange }: Props) => {
  const [input, setInput] = useState(user)
  const [error, setError] = useState('')

  const handleInput = (input: string) => {
    setInput(input)
    if (input.trim() === '') {
      setError('Name is required')
    } else {
      setError('')
      onUserChange(input)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label='Add your name...'
        placeholder='Add your name...'
        value={input}
        numberOfLines={1}
        maxLength={60}
        onChangeText={handleInput}
        cursorColor={colors.yellow}
        underlineColor={colors.yellow}
        activeUnderlineColor={colors.yellow}
        placeholderTextColor={colors.blueLight}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    backgroundColor: colors.transparent,
    color: colors.yellow
  },
  error: {
    color: colors.red,
    marginTop: 5,
  },
})
