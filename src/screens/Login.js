"use strict";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
// Component
import Header from "../components/Header";

import {Colors} from "react-native/Libraries/NewAppScreen";
import React, {Component} from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import qs from 'qs';
import Constant from '../../config/Constant';


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
    this.setState({ showPassword: !this.state.showPassword });
  }
  async login(){
    this.setState({progress: true, loginError: null});
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    const self = this;
    axios.post(
        Constant.apiLogin,
        qs.stringify(user)
      )
      .then(async function (response) {
        if(response.status == 200){
          self.setState({loginError: null});
          response.data.user.userPassword =  user.password;
          await AsyncStorage.setItem('userInfo', JSON.stringify(response.data.user));
          self.props.navigation.navigate('Action');
        } else{
          self.setState({loginError: response.data.error.text});
        }
        self.setState({progress: false});
      })
      .catch(function (error) {
        self.setState({loginError: 'Network error'});
        self.setState({progress: false});
        throw error;
      });
  }
  render() {
    return (
      <ImageBackground source={require('../../assets/images/bg.jpg')} style={{width: '100%', height: '100%'}}>
        <SafeAreaView style={styles.mainLogin}>
          <Header />
          <View style={styles.sectionLogin}>
            { this.state.loginError != null ?
              <View style={styles.sectionWarning}>
                <Text style={styles.textWarning}>{ this.state.loginError }</Text>
              </View>
            : null }
            <TextInput
              style={styles.textInput}
              placeholder="Username"
              onChangeText={(username) => this.setState({username})}
              value={this.state.username}
            />
            <View style={styles.sectionPassword}>
              <TextInput
                style={styles.textInputPassword}
                placeholder="Password"
                secureTextEntry={!this.state.showPassword}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
              />
              <Icon style={styles.iconPassword}
                    name={this.state.showPassword ? "eye" : "eye-slash" }
                    onPress={()=>{this.showPassword()}} />
            </View>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={()=>{this.login()}}>
              { this.state.progress ?  <ActivityIndicator size="small" color="#fff" style={{marginRight: 8}} /> : null }
              <Text style={styles.textButton}>Login</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  mainLogin: {
    flex: 1,
  },
  sectionWarning: {
    backgroundColor: 'red',
    padding: 20,
    marginBottom: 30,
    width: '100%',
  },
  textWarning : {
    color: '#FFF',
    fontSize: 16
  },
  sectionLogin: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  sectionPassword: {
    position: 'relative',
    height: 40,
    width: '80%',
    maxWidth: 400,
    marginBottom: 30,
  },
  textInputPassword: {
    borderRadius: 3,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 40,
    fontSize: 14,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  iconPassword: {
    color: Colors.dark,
    fontSize: 20,
    width: 40,
    height: 40,
    position: 'absolute',
    textAlign: 'center',
    textAlignVertical: 'center',
    right: 0,
  },
  textInput: {
    borderRadius: 3,
    width: '80%',
    maxWidth: 400,
    height: 40,
    fontSize: 14,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  selectButton: {
    width: 100,
    height: 45,
    justifyContent: 'center',
    backgroundColor: 'red',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
  },
  textButton: {
    color: 'white',
    fontSize: 15,
  },
});
