import { Pressable, StyleSheet } from 'react-native'
import { Text } from '../../ui/Themed'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import colors from '../../ui/colors'
import { ComponentProps } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'

interface Props {
  icon: ComponentProps<typeof MaterialIcons>['name']
  label: string
  onPress: () => void
}

export default function IconButton({ icon, label, onPress }: Props) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <FontAwesome5 name={icon} size={24} color={colors.white} />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonLabel: {
    color: colors.white,
    marginTop: 12,
  },
});
