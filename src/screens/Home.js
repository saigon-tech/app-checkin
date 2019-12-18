import {SafeAreaView, ActivityIndicator, StyleSheet} from "react-native";
import React, {Component} from "react";
import AsyncStorage from '@react-native-community/async-storage';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const self = this;
    AsyncStorage.getItem('userInfo').then((data) => {
      if (data == null) {
        self.props.navigation.navigate('Login');
      } else {
        self.props.navigation.navigate('Action', JSON.parse(data));
      }
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.mainLogin}>
        <ActivityIndicator size="large" color="#e60012" style={{marginRight: 15}}/>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainLogin: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center'
  }
});
