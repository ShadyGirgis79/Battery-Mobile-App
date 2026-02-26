import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ChargingState } from '../types';
import { useTranslation } from 'react-i18next';

interface Props {
  batteryData: ChargingState;
}

export default function BatteryComponent({ batteryData }: Props) {

  const { t } = useTranslation();
  const [batteryState, setBatteryState] = useState("");
  const [batteryImage, setBatteryImage] = useState(require('../assets/Battery-100.png'));

  const updateBatteryImage = (level: number) => {
    if (level >= 80) {
      setBatteryImage(require('../assets/Battery-100.png'));
    } else if (level >= 60) {
      setBatteryImage(require('../assets/Battery-80.png'));
    } else if (level >= 40) {
      setBatteryImage(require('../assets/Battery-60.png'));
    } else if (level >= 20) {
      setBatteryImage(require('../assets/Battery-40.png'));
    } else {
      setBatteryImage(require('../assets/Battery-20.png'));
    }
  };



  useEffect(() => {
    updateBatteryImage(batteryData.chargingLevel);
  }, [batteryData]);

  

  return (
    <View style={styles.container}>
      
      <Image
        source={batteryImage}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.levelText}>
        {batteryData.chargingLevel}%
      </Text>

      <View style={[
        { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 30, marginTop: 30 },
        batteryData.currentState === 'Charging' && { backgroundColor: '#3cb371' },
        batteryData.currentState === 'Discharging' && { backgroundColor: '#ff6347' },
        batteryData.currentState === 'Neutral' && { backgroundColor: '#f0e68c' },
        ]}>
        <Text style={[
          styles.stateText

        ]}>
          {batteryData.currentState === 'Charging' && t("charge")}
          {batteryData.currentState === 'Discharging' && t("discharge")}
          {batteryData.currentState === 'Neutral' && t("neutral")}
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: 800,
    height: 400,
  },
  levelText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginTop: 10,
  },
  stateText: {
    fontSize: 28,
    marginTop: 5,
    color: '#000',
  }
});