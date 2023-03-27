import fontFamily from '../fontFamily'
import colors from '../colors'
import { Text } from './Themed'
import { Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Link as ExpoLink } from 'expo-router'

interface Props extends React.ComponentProps<typeof ExpoLink> {
  text: string
  style?: ViewStyle & TextStyle
  children?: React.ReactNode
}

const Link = ({ text, style, children, ...props }: Props) => {
  const defaultStyles = StyleSheet.create({
    container: {
      padding: 10,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.yellow,
      borderStyle: 'solid',
    },
    linkText: {
      fontFamily: fontFamily.MontserratMedium,
      marginRight: 5,
      fontSize: Platform.OS === 'web' ? 18 : 12,
    },
  })

  return (
    <ExpoLink style={[defaultStyles.container, style]} {...props}>
      {children}
      <Text style={[defaultStyles.linkText]}>{text}</Text>
    </ExpoLink>
  )
}


export default Link