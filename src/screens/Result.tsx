import { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { AnimatedCircularProgress } from "react-native-circular-progress"
import colors from "../colors/colors"
import { KeysQuestsType, quests, QuestType } from "../data/quests"
import { getQuest, saveQuest } from "../functions/storage"
import { AnimatedViewFadeIn } from "../hoc/AnimatedView"

export const Result = () => {
	const [precent, setPrecent] = useState<number | null>(null)
	const [quest, setQuest] = useState<QuestType | null>(null)

	const getData = async () => {
		const quest = await getQuest()

		let precent = null
		let diff = null as KeysQuestsType | null
		let questIndex = null

		if (quest) {
			precent = quest.precent
			diff = quest.diff
			questIndex = quest.index
		} else {
			precent = Math.floor(Math.random() * 99) + 1
			if (precent > 90) diff = 'ultra'
			else if (precent > 70) diff = 'hard'
			else if (precent > 40) diff = 'medium'
			else diff = 'simple'
		}

		let questDiff = quests[diff]
		questIndex = questIndex || Math.floor(Math.random() * questDiff.length)

		await saveQuest(diff, questIndex, precent)
		setQuest(questDiff[questIndex])
		setPrecent(precent)
	}

	useEffect(() => {
		getData()
	}, [])

	return (
		<View style={styles.container}>
			{precent &&
				<View style={styles.content}>
					<AnimatedCircularProgress
						size={200}
						width={16}
						fill={precent}
						rotation={0}
						lineCap="round"
						tintColor={colors.main}
						onAnimationComplete={() => console.log('onAnimationComplete')}
						backgroundColor="#eee"
						style={styles.progress}
					>
						{(fill) => (<Text style={styles.progressValue}>{precent}%</Text>)}
					</AnimatedCircularProgress>
					{quest &&
						<AnimatedViewFadeIn>
							<Text style={styles.title}>{quest.title}</Text>
							<Text style={styles.description}>{quest.description}</Text>
						</AnimatedViewFadeIn>
					}
				</View>
			}
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

	progress: {
		width: 200,
		marginHorizontal: 'auto',
		marginBottom: 40,
	},

	progressValue: {
		fontFamily: 'Nunito-Bold',
		fontSize: 48,
		color: colors.main,
	}
})