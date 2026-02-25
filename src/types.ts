export interface ChargingState {
  date: string;
  chargingLevel: number;
  internalEventId: number;
  currentState?: string;
}

export interface ChargingHistoryResponse {
  chargingStates: ChargingState[];
}
