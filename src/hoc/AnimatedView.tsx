import { FC, PropsWithChildren, useEffect, useRef } from "react"
import { Animated } from "react-native"

export const AnimatedViewFadeIn: FC<PropsWithChildren> = ({children}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {toValue: 1, duration: 500, delay: 500, useNativeDriver: true}).start();
  }, [fadeAnim])

  return (
    <Animated.View style={{opacity: fadeAnim}}>
      {children}
    </Animated.View>
  )
}