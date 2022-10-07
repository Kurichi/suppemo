import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CreateCard from "../screens/CreateCard";
import Camera from "../screens/Camera";

const Stack = createStackNavigator();

export default function CameraStack() {
  return (
    <Stack.Navigator
      initialRouteName="CameraTop">
      <Stack.Screen name='CameraTop' component={CreateCard} />
      <Stack.Screen name='TakePhoto' component={Camera} />
    </Stack.Navigator>
  )
}