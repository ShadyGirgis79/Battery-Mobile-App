import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Home, Welcome } from "./routes";

import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {

  return (
    <Stack.Navigator 
      initialRouteName={Welcome}   
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={Welcome} component={WelcomeScreen} options={{headerShown: false}} />
      <Stack.Screen name={Home} component={HomeScreen} options={{headerShown: false}} />
      
    </Stack.Navigator>
  );
};