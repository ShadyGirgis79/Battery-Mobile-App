import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import BackendResponse from '../constants/backend-response.json';
import { ChargingHistoryResponse, ChargingState } from '../types';
import { checkChargingState } from "../utils/BatteryState";
import BatteryComponent from '../components/BattryComponent';
import TimePicker from '../components/TimePicker';

export default function HomeScreen() {

  const [chargingCurrentState, setChargingCurrentState] = useState<ChargingState[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const chargingData = async () => {
    try {
      const data = BackendResponse as ChargingHistoryResponse;
      const processed = checkChargingState(data.chargingStates);
      setChargingCurrentState(processed);

      // Set default time to first item
      if (processed.length > 0) {
        setSelectedTime(processed[0].date);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    chargingData();
  }, []);

  // Find matched battery state
  const matchedBattery = useMemo(() => {
    return chargingCurrentState.find(
      (item) => item.date === selectedTime
    );
  }, [selectedTime, chargingCurrentState]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Battery Charging History</Text>

      <TimePicker
        data={chargingCurrentState}
        selectedTime={selectedTime}
        onTimeChange={setSelectedTime}
      />

      {matchedBattery && (
        <BatteryComponent batteryData={matchedBattery} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});