import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ChargingState } from '../types';

interface Props {
  batteryData: ChargingState;
}

export default function BatteryComponent({ batteryData }: Props) {

  return (
    <View style={styles.container}>
      
      <Image
        source={require('../assets/Battery-100.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.levelText}>
        {batteryData.chargingLevel}%
      </Text>

      <Text style={[
        styles.stateText,
        batteryData.currentState === 'Charging' && { color: 'green' },
        batteryData.currentState === 'Discharging' && { color: 'red' }
      ]}>
        {batteryData.currentState}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 100,
  },
  levelText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
  },
  stateText: {
    fontSize: 18,
    marginTop: 5,
  }
});