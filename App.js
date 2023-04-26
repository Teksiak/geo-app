import { StyleSheet, StatusBar, Text, View } from 'react-native';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './components/Views/Main';
import List from './components/Views/List';
import MapDisplay from './components/Views/Map';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} options={{
          headerShown: false
        }} />
        <Stack.Screen name="List" component={List} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Map" component={MapDisplay} options={{
          headerShown: false
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
