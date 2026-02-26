import { View, Text, StyleSheet, Touchable, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import BackendResponse from '../constants/backend-response.json';
import { ChargingHistoryResponse, ChargingState } from '../types';
import { checkChargingState } from "../utils/BatteryState";
import { useTranslation } from 'react-i18next';
import LanguageModal from '../components/LanguageModal';
import BatteryComponent from '../components/BattryComponent';
import TimePicker from '../components/TimePicker';

export default function HomeScreen() {

  const { t } = useTranslation();
  const currentTime = new Date().toISOString();

  const [chargingCurrentState, setChargingCurrentState] = useState<ChargingState[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(currentTime);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const chargingData = async () => {
    try {
      // Will change it with the backend API call
      const data = BackendResponse as ChargingHistoryResponse;
      
      const processed = checkChargingState(data.chargingStates);
      setChargingCurrentState(processed);

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
  <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.languageButtonTop}
          onPress={() => setLanguageModalVisible(true)}
        >
          <Text style={styles.languageButtonText}>{t("language")} 🌍</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{t("header")}</Text>

        <TimePicker
          data={chargingCurrentState}
          selectedTime={selectedTime}
          onTimeChange={setSelectedTime}
        />

        {matchedBattery && (
          <BatteryComponent batteryData={matchedBattery} />
        )}

        <LanguageModal
          visible={languageModalVisible}
          onClose={() => setLanguageModalVisible(false)}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    paddingTop: "20%",
  },
  languageButtonTop: {
    position: 'absolute',
    top: 80,
    right: 20,
    borderWidth: 2,
    borderColor: '#3b5ea7',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  languageButtonText: {
    fontSize: 20,
    color: '#fff',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // ensures image covers the screen
  },
});