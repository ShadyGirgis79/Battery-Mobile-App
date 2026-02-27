import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ChargingState } from '../types';
import { useTranslation } from 'react-i18next';

interface Props {
  data: ChargingState[];
  selectedTime: string | null;
  onTimeChange: (value: string) => void;
}

export default function TimePicker({ data, selectedTime, onTimeChange }: Props) {

  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  const handleConfirm = (date: Date) => {
    setIsVisible(false);

    // Match by hour
    const matched = data.find(item => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getHours() === date.getHours()
      );
    });

    if (matched) {
      onTimeChange(matched.date);
    }
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.buttonText}>
          {selectedTime
            ? new Date(selectedTime).toLocaleTimeString()
            : t("selectTime")}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={() => setIsVisible(false)}
        display="spinner"
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  button: {
    padding: 12,
    backgroundColor: '#222',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
  },
});