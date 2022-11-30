import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CreateCard from "../screens/CreateCard";
import TakePicture from "../screens/TakePicture";
import CreatedCardList from "../screens/CreatedCardList";
import EditCard from "../screens/EditCard";

const Stack = createStackNavigator();

export default function CameraStack() {
  return (
    <Stack.Navigator
      initialRouteName="CameraTop"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name='CameraTop' component={CreateCard} />
      <Stack.Screen name='TakePhoto' component={TakePicture} />
      <Stack.Screen name='CreatedCardList' component={CreatedCardList} />
      <Stack.Screen name='EditCard' component={EditCard} />
    </Stack.Navigator>
  )
}