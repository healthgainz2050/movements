import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import VideoSentiments from './video-sentimentals';
import AppUsage from './app-usage';
import {HeaderTitle} from '../../../Components/HeaderTitle';
import {Cone} from '../../../Components/curve-shape';
import React from 'react';
import {HeaderBackButton} from 'react-navigation-stack';
import {Platform} from 'react-native';

export default createMaterialTopTabNavigator(
  {
    AppUsage: {
      screen: AppUsage,
      navigationOptions: {
        tabBarLabel: 'App Usage',
        tabBarOptions: {
          labelStyle: {
            fontWeight: 'bold',
          },
        },
      },
    },
    VideoSentiments: {
      screen: VideoSentiments,
      navigationOptions: {
        tabBarLabel: 'Video Ratings',
        tabBarOptions: {
          labelStyle: {
            fontWeight: 'bold',
          },
        },
      },
    },
  },
  {
    initialRouteName: 'AppUsage',
    activeColor: '#3862CF',
    inactiveColor: '#3e2465',
    barStyle: {backgroundColor: '#694fad'},
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => <HeaderTitle title={'Usage'} />,
        headerRight: () => <Cone />,
        headerLeft: () => {
          return (
            <HeaderBackButton
              onPress={() => navigation.goBack()}
              label={'Back'}
              backTitleVisible={Platform.OS == 'ios' ? true : false}
            />
          );
        },
      };
    },
  },
);
