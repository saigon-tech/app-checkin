"use strict";
import React from 'react';
import {createAppContainer, createBottomTabNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import 'react-native-gesture-handler';

import HomeScreen from './src/screens/Home';
import LoginScreen from './src/screens/Login';
import ActionScreen from './src/screens/Action';

const MainNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    Action: ActionScreen,
  },
  {
    headerMode: 'none',
  }
);

//export default createAppContainer(TabNavigator);

const App = createAppContainer(MainNavigator);
export default App;


