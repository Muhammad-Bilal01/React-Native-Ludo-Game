import { View, Text, StyleSheet, Image, Alert, Pressable } from 'react-native';
import React, { useCallback, useEffect, useRef } from 'react';
import Wrapper from '../components/Wrapper';
import Logo from './../assets/images/logo.png';
import { deviceHeight, deviceWidth } from '../constants/Scaling';
import GradientButton from './../components/GradientButton';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  withRepeat,
} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import Witch from '../assets/animation/witch.json';
import { playSound } from '../helpers/SoundUtility';
import { useIsFocused } from '@react-navigation/native';
import { navigate } from '../helpers/NavigationUtil';
import { selectCurrentPosition } from './../redux/reducers/gameSelectors';
import { useDispatch, useSelector } from 'react-redux';
import SoundPlayer from 'react-native-sound-player';
import { resetGame } from '../redux/reducers/gameSlice';

const HomeScreen = () => {
  const witchX = useSharedValue(-deviceWidth);
  const scaleX = useSharedValue(-1);
  const isFocussed = useIsFocused();
  const dispatch = useDispatch();
  const currentPosition = useSelector(selectCurrentPosition);

  useEffect(() => {
    if (isFocussed) {
      playSound('home');
    }
  }, [isFocussed]);

  // Run effect once
  useEffect(() => {
    // Full loop sequence
    witchX.value = withRepeat(
      withSequence(
        // 1. fly to 2% screen
        withTiming(deviceWidth * 0.02, { duration: 2000 }),

        // 2. wait
        withDelay(3000, withTiming(deviceWidth * 0.02)),

        // 3. fly off to the right
        withTiming(deviceWidth * 2, { duration: 8000 }, () => {
          // 🔥 Flip exactly when reaching the right side
          scaleX.value = 1;
        }),

        // 4. flip direction instantly
        withTiming(deviceWidth * 0.05, { duration: 3000 }, () => {
          scaleX.value = 1;
        }),

        // // 5. wait again
        withDelay(3000, withTiming(deviceWidth * 0.05)),

        // // 6. fly off to the left
        withTiming(-deviceWidth * 2, { duration: 8000 }, () => {
          scaleX.value = -1;
        }),
      ),
      -1, // infinite loop
      false,
    );
  }, []);

  // Animated style
  const witchStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: witchX.value }, { scaleX: scaleX.value }],
  }));

  const renderButton = useCallback((title, onPress) => (
    <GradientButton title={title} onPress={onPress} />
  ));

  const startGame = async (isNew = false) => {
    SoundPlayer.stop();
    if (isNew) {
      dispatch(resetGame());
    }
    navigate('LudoBoardScreen');
    playSound('game_start');
  };

  const handleNewGamePress = useCallback(() => {
    startGame(true);
  }, []);

  const handleResumeGame = useCallback(() => {
    startGame(false);
  }, []);

  const handleComingSoon = useCallback(() => {
    Alert.alert('Cooming Soon');
  }, []);

  return (
    <Wrapper style={styles.mainContainer}>
      <View style={styles.imgContainer}>
        <Image source={Logo} style={styles.logoImage} />
      </View>

      {currentPosition.length !== 0 &&
        renderButton('Resume Game', handleResumeGame)}
      {renderButton('New Game', handleNewGamePress)}
      {renderButton('V/S CPU', handleComingSoon)}
      {renderButton('2 Player', handleComingSoon)}

      {/* Witch Animation */}
      <Animated.View style={[styles.witchContainer, witchStyle]}>
        <Pressable
          onPress={() => {
            const random = Math.floor(Math.random() * 3) + 1; // 1 - 3
            console.log('Witch Click ', random);
            playSound(`girl${random}`);
          }}
        >
          <LottieView
            source={Witch}
            autoPlay
            loop
            speed={1}
            style={styles.witch}
          />
        </Pressable>
      </Animated.View>

      <Text style={styles.artist}>Made by - Muhammad Bilal</Text>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'flex-start',
  },
  imgContainer: {
    width: deviceWidth * 0.6,
    height: deviceHeight * 0.2,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  artist: {
    position: 'absolute',
    bottom: 40,
    fontWeight: 800,
    fontStyle: 'italic',
    opacity: 0.8,
    color: 'white',
  },
  witchContainer: {
    position: 'absolute',
    top: '70%',
    left: '24%',
  },
  witch: {
    height: 250,
    width: 250,
    transform: [{ rotate: '25deg' }],
  },
});

export default HomeScreen;
