import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../ui/colors'
import { View, Text } from '../ui/components/Themed'
import fontFamily from '../ui/fontFamily'

interface Props {
  onSave: () => void
}

export const SaveOrderButton = ({ onSave }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.saveButton} onPress={onSave}>
        <Ionicons name="save-outline" size={20} color={colors.white} />
        <Text style={styles.saveText}>Save to my order</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.yellow,
    padding: 10,
    margin: 5,
    borderRadius: 20,
    gap: 8
  },
  saveText: {
    fontFamily: fontFamily.MontserratMedium,
    fontSize: 12,
    color: colors.white,
  },
})