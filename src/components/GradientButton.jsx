import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import { playSound } from '../helpers/SoundUtility';

const iconSize = RFValue(12);

const GradientButton = ({ title, onPress, iconColor = '#d5be3e' }) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.btnContainer}
        activeOpacity={0.8}
        onPress={() => {
          playSound('ui');
          onPress();
        }}
      >
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.button}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <Text style={styles.btnText}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    marginVertical: 10,
  },
  btnContainer: {
    borderWidth: 5,
    borderRadius: 10,
    borderColor: '#d5be3e',
    elevation: 5,
    backgroundColor: 'white',
    shadowColor: '#d5be3e',
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 10,
    width: 250,
  },
  btnText: {
    color: 'white',
    width: '70%',
    textAlign: 'center',
    fontSize: RFValue(16),
    fontFamily: 'Philosopher-Bold',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#000',
  },
});

export default GradientButton;
