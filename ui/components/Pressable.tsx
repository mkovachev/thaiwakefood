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
  const container = [style, !isOnlyIcon ? styles.container : styles.containerIconOnly]
  const actionText = [style, styles.actionText]
  const iconStyle = [
    styles.iconStyle,
    icon && icon.props.color && { color: icon.props.color },
  ]


  return (
    <DefaultPressable
      style={container}
      {...props}
      onPress={(event) => url ? router.push(url) : props.onPress?.(event)}>
      {icon && React.cloneElement(icon, { style: iconStyle })}
      {children}
      {text && <Text style={actionText}>{text}</Text>}
    </DefaultPressable>
  )
}

export default Pressable

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 8,
    gap: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.blueLight,
  },
  containerIconOnly: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    color: colors.blueLight
  },
  actionText: {
    fontFamily: fontFamily.MontserratMedium,
    color: colors.blueLight,
  },
})
