import { ChargingState } from "../types";

export const checkChargingState = (data: ChargingState[]) => {
  return data.map((item, index) => {
    if (index === 0) return { ...item, currentState: "Neutral" };

    const prev = data[index - 1].chargingLevel;

    if (item.chargingLevel > prev) {
      return { ...item, currentState: "Charging" };
    } 
    else if (item.chargingLevel < prev) {
      return { ...item, currentState: "Discharging" };
    } 
    else {
      return { ...item, currentState: "Neutral" };
    }
  });
};