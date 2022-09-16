import { StatusBar } from 'expo-status-bar'
import { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { Home } from './src/screens/Home'
import { Result } from './src/screens/Result'
import { getQuest } from './src/functions/storage'

export default function App() {
	const [activeScreen, setActiveScreen] = useState(0)
	const [appIsReady, setAppIsReady] = useState(false)
	const [isLoadedData, setIsLoadedData] = useState(false)

	useEffect(() => {
		async function prepare() {
			try {
				await SplashScreen.preventAutoHideAsync()
				await Font.loadAsync({
					'Nunito-Black': require('./src/fonts/Nunito-Black.ttf'),
					'Nunito-Bold': require('./src/fonts/Nunito-Bold.ttf'),
				})
				await new Promise(resolve => setTimeout(resolve, 2000))
			} catch (e) {
				console.warn(e)
			} finally {
				setAppIsReady(true)
			}
		}

		prepare()
	}, [])

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			await SplashScreen.hideAsync()
		}
	}, [appIsReady])

	if (!appIsReady) {
		return null
	}

	const getData = async () => {
		const quest = await getQuest()
		if (quest) setActiveScreen(1)
		setIsLoadedData(true)
	}
	getData()

	return (
		<View style={{flex: 1}} onLayout={onLayoutRootView}>
			{isLoadedData &&
				<>
					{activeScreen === 1 && <Result />}
					{!activeScreen && <Home setActiveScreen={setActiveScreen} />}
					<StatusBar style="auto" />
				</>
			}
		</View>
	)
}
