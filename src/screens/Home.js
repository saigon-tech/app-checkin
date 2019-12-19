import {SafeAreaView, ActivityIndicator, Text} from "react-native";
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
      <SafeAreaView style={appStyle.mainHome}>
        <ActivityIndicator style={appStyle.activityHome} size="large" color={Colors.red} />
        <Text>Loading ...</Text>
      </SafeAreaView>
    );
  }
}
