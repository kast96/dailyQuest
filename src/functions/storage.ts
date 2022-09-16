import { AsyncStorage } from 'react-native'
import { Alert } from "react-native"
import { KeysQuestsType } from "../data/quests"

const storeData = async (key: string, value: any) => {
	try {
		const jsonValue = JSON.stringify(value)
		await AsyncStorage.setItem('@dailyQuest:'+key, jsonValue)
	} catch (e) {
		Alert.alert('Ошибка', 'Ошибка сохранения данных')
	}
}

const getData = async (key: string) => {
	try {
		const jsonValue = await AsyncStorage.getItem('@dailyQuest:'+key)
		return jsonValue != null ? JSON.parse(jsonValue) : null
	} catch(e) {
		Alert.alert('Ошибка', 'Ошибка получения данных')
	}
}

export const saveQuest = async (diff: KeysQuestsType, index: number, precent: number) => {
	const date = new Date()
	const value = {date: date.toLocaleDateString("ru-RU"), diff, index, precent}

	await storeData('quest', value)
}

type DataQuestType = {
	diff: KeysQuestsType
	index: number
	precent: number
	date: string
}

export const getQuest = async () => {
	let quest = await getData('quest') as DataQuestType
	const date = new Date()
	if (date.toLocaleDateString("ru-RU") !== quest?.date) return null
	return quest
}