import fontFamily from '../fontFamily'
import colors from '../colors'
import { Text, PressableThemed as DefaultPressable } from './Themed'
import { Platform, StyleSheet, ViewStyle, TextStyle, PressableProps } from 'react-native'
import { ReactElement } from 'react'
import React from 'react'
import { useRouter } from 'expo-router'

interface Props extends PressableProps {
  text?: string
  url?: string
  style?: ViewStyle & TextStyle
  children?: React.ReactNode
  icon?: ReactElement
}

const Pressable = ({ text, url, style, children, icon, ...props }: Props) => {
  const router = useRouter()
  const isOnlyIcon = icon && !text
  const linkContainerStyle = [style, !isOnlyIcon ? styles.container : styles.containerIconOnly]
  const linkTextStyle = [style, styles.linkText]
  const iconStyle = [
    styles.iconStyle,
    icon && icon.props.color && { color: icon.props.color },
  ]


  return (
    <DefaultPressable
      style={linkContainerStyle}
      {...props}
      onPress={(event) => url ? router.push(url) : props.onPress?.(event)}>
      {icon && React.cloneElement(icon, { style: iconStyle })}
      {children}
      {text && <Text style={linkTextStyle}>{text}</Text>}
    </DefaultPressable>
  )
}

export default Pressable

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    margin: 5,
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.blueLight,
  },
  containerIconOnly: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    margin: 5,
    padding: 8,
  },
  iconStyle: {
    color: colors.blueLight
  },
  linkText: {
    fontFamily: fontFamily.MontserratMedium,
    color: colors.blueLight,
    marginRight: 5,
    fontSize: Platform.OS === 'web' ? 18 : 12,
  },
})
