import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MyCardMenu from "../screens/CameraStack/MyCardMenu";
import TakePicture from "../screens/CameraStack/TakePicture";
import CreatedCardList from "../screens/CameraStack/CreatedCardList";
import EditCard from "../screens/CameraStack/EditCard";
import { CreateCard } from "../screens/CameraStack/CreateCard";

const Stack = createStackNavigator();

export default function CameraStack() {
  return (
    <Stack.Navigator
      initialRouteName="CameraTop"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name='CameraTop' component={MyCardMenu} />
      <Stack.Screen name='TakePhoto' component={TakePicture} />
      <Stack.Screen name='CreatedCardList' component={CreatedCardList} />
      <Stack.Screen name='EditCard' component={EditCard} />
      <Stack.Screen name='CreateCard' component={CreateCard} />
    </Stack.Navigator>
  )
}