import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GameScreen } from './src/screens/GameScreen';
import { OptionsScreen } from './src/screens/OptionsScreen';
import { StatsScreen } from './src/screens/StatsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#666',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopColor: '#e0e0e0',
            borderTopWidth: 1,
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Tab.Screen
          name="Game"
          component={GameScreen}
          options={{
            title: 'AI Checkers',
            tabBarLabel: 'Game',
          }}
        />
        <Tab.Screen
          name="Options"
          component={OptionsScreen}
          options={{
            title: 'Options',
            tabBarLabel: 'Options',
          }}
        />
        <Tab.Screen
          name="Stats"
          component={StatsScreen}
          options={{
            title: 'Statistics',
            tabBarLabel: 'Stats',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
