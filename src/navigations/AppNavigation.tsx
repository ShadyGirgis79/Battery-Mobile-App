import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Home } from "./routes";

import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {

  return (
    <Stack.Navigator 
      initialRouteName={Home}   
      screenOptions={{ headerShown: false }}
    >
        <Stack.Screen name={Home} component={HomeScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};