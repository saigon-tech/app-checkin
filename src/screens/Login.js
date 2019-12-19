"use strict";
import {
  ImageBackground,
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
// Component
import Header from "../components/Header";

import React, {Component} from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import qs from 'qs';
import Constant from '../../config/Constant';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    showPassword: false,
    username: '',
    password: '',
    progress: false,
    loginError: null,
  };

  showPassword() {
    this.setState({showPassword: !this.state.showPassword});
  }

  async login() {
    this.setState({progress: true, loginError: null});
    let user = {
      username: this.state.username,
      password: this.state.password
    };
    const self = this;
    try {
      let response = await axios.post(Constant.apiLogin, qs.stringify(user));
      if (response.status == 200) {
        self.setState({loginError: null});
        let userInfo = {
          employeeId: response.data.user.employeeId,
          employeeName: response.data.user.employeeName,
          employeeAvatar: null
        };
        let urlAvatar = Constant.apiGetAvatar.replace('{employeeId}', userInfo.employeeId);
        try {
          let userAvatar = await axios.get(urlAvatar);
          userInfo.employeeAvatar = 'data:image/png;base64,' + userAvatar.data.data.base64;
        } catch (error) {
          // Error get avatar
        }
        await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        self.props.navigation.navigate('Action', userInfo);
      } else {
        self.setState({loginError: response.data.error.text});
      }
      self.setState({progress: false});
    } catch (e) {
      self.setState({loginError: 'Network error'});
      self.setState({progress: false});
      throw e;
    }
  }

  render() {
    return (
      <ImageBackground source={require('../../assets/images/bg.jpg')} style={appStyle.mainWrapper}>
        <SafeAreaView style={appStyle.mainLogin}>
          <Header/>
          <View style={appStyle.sectionLogin}>
            {this.state.loginError != null ?
              <View style={appStyle.sectionWarning}>
                <Text style={appStyle.textWarning}>{this.state.loginError}</Text>
              </View>
              : null}
            <TextInput
              style={appStyle.textInput}
              placeholder="Username"
              onChangeText={(username) => this.setState({username})}
              value={this.state.username}
            />
            <View style={appStyle.sectionPassword}>
              <TextInput
                style={appStyle.textInputPassword}
                placeholder="Password"
                secureTextEntry={!this.state.showPassword}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
              />
              <Icon style={appStyle.iconPassword}
                    name={this.state.showPassword ? "eye" : "eye-slash"}
                    onPress={() => {
                      this.showPassword()
                    }}/>
            </View>
            <TouchableOpacity
              style={appStyle.selectButton}
              onPress={() => {
                this.login()
              }}>
              {this.state.progress ?
                <ActivityIndicator size="small" color={Colors.white} style={{marginRight: 8}}/>
                :
                <Ionicons name='ios-log-in' size={18} color={Colors.white} style={{marginRight: 14}} />
              }
              <Text style={appStyle.textButton}>Login</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

