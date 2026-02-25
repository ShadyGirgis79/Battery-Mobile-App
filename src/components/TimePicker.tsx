import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ChargingState } from '../types';

interface Props {
  data: ChargingState[];
  selectedTime: string | null;
  onTimeChange: (value: string) => void;
}

export default function TimePicker({ data, selectedTime, onTimeChange }: Props) {

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedTime}
        style={{ width: 300 }}
        // @ts-ignore
        onValueChange={(itemValue) => onTimeChange(itemValue)}
      >
        {data.map((item) => (
          <Picker.Item
            key={item.internalEventId}
            label={new Date(item.date).toLocaleTimeString()}
            value={item.date}
          />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
});