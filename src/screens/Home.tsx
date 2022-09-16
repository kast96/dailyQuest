import { Dispatch, FC, SetStateAction } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import colors from "../colors/colors"
import { Button } from "../components/Button"
import logo from "../images/logo.webp"

type PropsType = {
	setActiveScreen: Dispatch<SetStateAction<number>>
}

export const Home : FC<PropsType> = ({setActiveScreen}) => {
	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Image style={styles.logo} source={logo} />
				<Text style={styles.title}>Название проекта</Text>
				<Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis</Text>
				<Button title="Начать" onPress={() => setActiveScreen(1)} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.bg,
		alignItems: 'center',
		justifyContent: 'center',
	},

	content: {
		width: 320,
	},

	logo: {
		width: 300,
		height: 300,
		marginBottom: 40,
	},

	title: {
		fontFamily: 'Nunito-Black',
		fontSize: 32,
		textAlign: 'center',
		color: colors.title,
		marginBottom: 12,
	},

	description: {
		fontFamily: 'Nunito-Bold',
		fontSize: 16,
		textAlign: 'center',
		color: colors.text,
		marginBottom: 40,
	},
})