import fontFamily from '../../ui/fontFamily'
import { Text, TextProps } from '../../ui/components/Themed'

export function MontserratText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: fontFamily.Montserrat }]} />
}
