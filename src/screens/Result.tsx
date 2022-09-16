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
	const [level, setLevel] = useState<levelType | null>(null)

	type levelType = {
		start: number
		diff: KeysQuestsType
		color: string
	}

	const levels = [
		{start: 90, diff: 'ultra', color: '#333'},
		{start: 70, diff: 'hard', color: '#EB340C'},
		{start: 40, diff: 'medium', color: '#E9B602'},
		{start: 0, diff: 'simple', color: '#38B000'}
	] as Array<levelType>

	const getData = async () => {
		const quest = await getQuest()

		let precent = 0
		let diff = null as KeysQuestsType | null
		let questIndex = null

		if (quest) {
			precent = quest.precent
			diff = quest.diff
			questIndex = quest.index
		} else {
			precent = Math.floor(Math.random() * 99) + 1
		}

		const level = levels.find(item => precent > item.start)
		if (!level) return
		
		setLevel(level)
		
		diff = diff || level.diff

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
						tintColor={level?.color}
						backgroundColor="#eee"
						style={styles.progress}
					>
						{(fill) => (<Text style={[styles.progressValue, {color: level?.color}]}>{precent}%</Text>)}
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