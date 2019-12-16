'use strict';
import {StyleSheet, View, Image} from 'react-native';
import React, {Component} from 'react';

export default class Header extends Component {
  render() {
    return (
      <View style={styles.headerContainer}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/logo.png')}
          />
      </View>
    )
  }
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 100,
  },
  logo: {
    overflow: 'visible',
    resizeMode: 'contain',
    width: '100%',
    height: 40,
  },
});
