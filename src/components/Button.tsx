import { FC } from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"
import colors from "../colors/colors"

type PropsType = {
  title: string
  onPress?: () => void
}

export const Button: FC<PropsType> = ({title, onPress}) => {
	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<Text style={styles.title}>{title}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
    alignSelf: 'center',
    backgroundColor: colors.main,
    borderRadius: 50,
    marginBottom: 12,
    paddingVertical: 14,
    paddingHorizontal: 95,

    shadowColor: "#cc268a",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 9.22,
    elevation: 12,
	},

  title: {
    fontFamily: 'Nunito-Bold',
		fontSize: 20,
		textAlign: 'center',
		color: colors.titleButton,
  },
})