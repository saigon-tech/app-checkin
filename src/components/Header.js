'use strict';
import {View, Image} from 'react-native';
import React, {Component} from 'react';

export default class Header extends Component {
  render() {
    return (
      <View style={appStyle.headerContainer}>
          <Image
            style={appStyle.logo}
            source={require('../../assets/images/logo.png')}
          />
      </View>
    )
  }
};
