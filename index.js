'use strict';
import React, { Component } from 'react';
import {createAppContainer, createBottomTabNavigator} from 'react-navigation';
import {AppRegistry} from 'react-native';
import {OrderTopTabNavigator} from './presc'
import {InfoTopTabNavigator} from './info'
import {LogTopTabNavigator} from './history'
import {auto_bases, loadAutoCompleteData} from './init'

const MainBottomTabNavigator = createBottomTabNavigator(
  {
    의료기록: LogTopTabNavigator,
    원격조제: OrderTopTabNavigator,
    의료정보: InfoTopTabNavigator,
  },
  {
    initialRouteName: '원격조제',
    tabBarOptions: {
      activeTintColor: 'royalblue',
      inactiveTintColor: 'gray',
      labelStyle: {
        fontWeight:'bold', fontSize:14
      },
      tabStyle: {
        marginBottom:12,
      },
    },
  }
);

export const App = createAppContainer(MainBottomTabNavigator);

// skip this line if using Create React Native App
AppRegistry.registerComponent('Papricacare', () => {loadAutoCompleteData(); return App;});