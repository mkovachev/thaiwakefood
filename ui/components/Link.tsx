import fontFamily from '../fontFamily'
import colors from '../colors'
import { View, Text } from './Themed'
import { Platform, StyleSheet } from 'react-native'
import { Link as ExpoLink } from 'expo-router'

interface Props {
  url: string
  text: string
}

const Link = ({ url, text }: Props) => {
  console.log(url)
  return (
    <ExpoLink href={url} style={styles.container}>
      <Text style={styles.linkText}>{text}</Text>
    </ExpoLink>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.yellow,
    borderStyle: 'solid',
  },
  linkText: {
    fontFamily: fontFamily.MontserratMedium,
    marginRight: 5,
    fontSize: Platform.OS === 'web' ? 16 : 14,
  }
})

export default Link