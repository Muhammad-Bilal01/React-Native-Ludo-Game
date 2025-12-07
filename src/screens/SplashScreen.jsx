import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { deviceHeight, deviceWidth } from './../constants/Scaling';
import Wrapper from './../components/Wrapper';
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Logo from './../assets/images/logo.png';
import { prepareNavigation, resetAndNavigate } from '../helpers/NavigationUtil';

const SplashScreen = () => {
  const [isStop, setIsStop] = useState(false);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    prepareNavigation();
    setTimeout(() => {
      resetAndNavigate('HomeScreen');
    }, 1500);
  }, []);

  /*
  useEffect(() => {
    const breathingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1.0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    );

    if (!isStop) {
      breathingAnimation.start();
    }

    return () => {
      breathingAnimation.stop();
    };
  }, [isStop]);
*/

  useEffect(() => {
    if (!isStop) {
      scale.value = withRepeat(
        withTiming(1.1, { duration: 1000 }),
        -1,
        true, // reverse
      );
    } else {
      scale.value = 1;
    }
  }, [isStop]);

  return (
    <Wrapper>
      <Animated.View style={[styles.imgContainer, animatedStyle]}>
        <Image source={Logo} style={styles.img} />
      </Animated.View>

      <ActivityIndicator />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    width: deviceWidth * 0.7,
    height: deviceHeight * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default SplashScreen;
