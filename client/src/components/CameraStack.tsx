import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CreateCard from "../screens/CreateCard";
import TakePicture from "../screens/TakePicture";

const Stack = createStackNavigator();

export default function CameraStack() {
  return (
    <Stack.Navigator
      initialRouteName="CameraTop">
      <Stack.Screen name='CameraTop' component={CreateCard} />
      <Stack.Screen name='TakePhoto' component={TakePicture} />
    </Stack.Navigator>
  )
}