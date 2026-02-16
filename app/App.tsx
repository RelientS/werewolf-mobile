import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './src/screens/HomeScreen';
import { RoomScreen } from './src/screens/RoomScreen';
import { GameScreen } from './src/screens/GameScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2a2a3e',
            },
            headerTintColor: '#ffd700',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            contentStyle: {
              backgroundColor: '#1a1a2e',
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: '狼人杀', headerShown: false }}
          />
          <Stack.Screen
            name="Room"
            component={RoomScreen}
            options={{ title: '房间大厅' }}
          />
          <Stack.Screen
            name="Game"
            component={GameScreen}
            options={{
              title: '游戏中',
              headerLeft: () => null, // Disable back button during game
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
