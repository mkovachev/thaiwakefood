import { Text as DefaultText, View as DefaultView, Pressable as DefaultPressable, useColorScheme, StyleProp, TextStyle, ViewStyle } from 'react-native'
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
export type PressableProps = ThemeProps & React.ComponentProps<typeof DefaultPressable>

export function Text(props: TextProps) {
  const { style, lightColor: lightColor, darkColor, ...otherProps } = props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')
  return <DefaultText style={[{ color }, { fontFamily: fontFamily.MontserratMedium }, style]} {...otherProps} />
}

export function View(props: ViewProps) {
  const { style, lightColor: lightColor, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')
  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />
}

export function PressableThemed(props: PressableProps) {
  const { style, lightColor: lightColor, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')
  return <DefaultPressable style={[{ backgroundColor }, style as StyleProp<ViewStyle | TextStyle>]} {...otherProps} />
}