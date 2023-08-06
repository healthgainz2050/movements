import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import VideoSentiments from './video-sentimentals';
import AppUsage from './app-usage';
import React from 'react';

const Tab = createMaterialTopTabNavigator();

export const UsageAnalytics = () => {
  return (
    <Tab.Navigator
      initialRouteName="AppUsage"
      screenOptions={{
        tabBarActiveTintColor: '#3862CF',
        tabBarInactiveTintColor: '#3e2465',
        tabBarLabelStyle: {fontWeight: 'bold'},
        // tabBarStyle: {backgroundColor: '#694fad'},
      }}>
      <Tab.Screen
        name="App Usage"
        component={AppUsage}
        screenOptions={{
          tabBarLabel: 'App Usage',
        }}
      />
      <Tab.Screen
        name="Video Sentiments"
        component={VideoSentiments}
        screenOptions={{
          tabBarLabel: 'Video Ratings',
        }}
      />
    </Tab.Navigator>
  );
};
