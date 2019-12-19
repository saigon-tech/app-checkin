"use strict";
import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import 'react-native-gesture-handler';

global.appStyle = require('./assets/styles/AppStyle');
global.Colors = require('./assets/styles/Colors');

import HomeScreen from './src/screens/Home';
import LoginScreen from './src/screens/Login';
import ActionScreen from './src/screens/Action';

const AppStack = createStackNavigator(
  {
    Action: ActionScreen
  },
  {
    headerMode: 'none',
  }
);
const AuthStack = createStackNavigator(
  {
    Login: LoginScreen
  },
  {
    headerMode: 'none',
  }
);

const App = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: HomeScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  )
);
export default App;


