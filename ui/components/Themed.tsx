/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, useColorScheme, View as DefaultView } from 'react-native'
import { Link as DefaultLink } from 'expo-router'

import colors from '../colors'
import fontFamily from '../fontFamily'

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof colors.light & keyof typeof colors.dark
) {
  const theme = useColorScheme() ?? 'light'
  const colorFromProps = props[theme]

  if (colorFromProps) {
    return colorFromProps
  } else {
    return colors[theme][colorName]
  }
}

type ThemeProps = {
  lightColor?: string
  darkColor?: string
}

export type TextProps = ThemeProps & DefaultText['props']
export type ViewProps = ThemeProps & DefaultView['props']
//export type LinkProps = ThemeProps & DefaultLink['props']

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')
  return <DefaultText style={[{ color }, { fontFamily: fontFamily.MontserratMedium }, style]} {...otherProps} />
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')
  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />
}

// export function Link(props: LinkProps) {
//   const { style, lightColor, darkColor, ...otherProps } = props
//   const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')
//   return <DefaultLink style={[{ backgroundColor }, style]} {...otherProps} />
// }