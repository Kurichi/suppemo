import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ChatSelector from "../screens/ChatStack/ChatSelector";
import QRCodeReader from "../screens/ChatStack/QRCodeReader";
import ApplyReader from "../screens/ChatStack/ApplyReader";
import ShowQRCode from "../screens/ChatStack/ShowQRCode";
import TemplateList from "./TListView";

const Stack = createStackNavigator();


const showORCodeStack = () => (
  <Stack.Navigator
    initialRouteName="show"
  >
    <Stack.Screen name='show' component={ShowQRCode} />
    <Stack.Screen name='apply' component={ApplyReader} />
    <Stack.Screen name='show' component={showORCodeStack} />
  </Stack.Navigator>
)
