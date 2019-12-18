import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  Keyboard,
  ActivityIndicator,
  AppState
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Header from "../components/Header";
import React, {Component} from "react";
import axios from "axios";

const moment = require('moment');

import Constant from '../../config/Constant';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HistoryScreen from '../../src/screens/History';
import qs from "qs";

class ActionScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    appState: AppState.currentState,
    keyboardState: 'closed',
    note: '',
    process: false,
    currentTime: moment().format('DD-MM-YYYY HH:mm:ss'),
    is_punched_in: null
  };

  async componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _keyboardDidShow = () => {
    this.setState({
      keyboardState: 'opened'
    });
  }

  _keyboardDidHide = () => {
    this.setState({
      keyboardState: 'closed'
    });
  }

  async logout() {
    try {
      await AsyncStorage.removeItem('userInfo');
      this.props.navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  }

  punched(employeeId, url) {
    const apiUrl = url.replace('{employeeId}', employeeId);
    const body = {
      datetime: moment().format('YYYY-MM-DD HH:mm'),
    }
    if (this.state.note != '') {
      body.note = this.state.note;
    }
    const self = this;
    self.setState({progress: true});
    axios.post(apiUrl, qs.stringify(body)).then(async function (response) {
      if (response.status == 200) {
        self.setState({is_punched_in: !self.state.is_punched_in});
        alert('Success');
      } else {
        alert(response.data.error.text);
      }
      self.setState({progress: false});
    })
      .catch(function (error) {
        alert('Error Network');
        self.setState({progress: false});
        throw error;
      });
  }

  _getUserStatus() {
    let employeeId = this.props.navigation.getParam('employeeId');
    const self = this;
    self.setState({is_punched_in: null});
    let apiUrl = Constant.apiGetStatus.replace('{employeeId}', employeeId);
    axios.get(apiUrl).then(async function (response) {
      if (response.status == 200) {
        self.setState({is_punched_in: response.data.data.is_punched_in});
      } else {
        console.log('Error 202 = ', response.data.error.text);
      }
    })
      .catch(function (error) {
        console.log('Network error');
        throw error;
      });
  }

  _handleAppStateChange = (nextAppState) => {
    const self = this;
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      self._getUserStatus();
    }
    self.setState({appState: nextAppState});
  };

  async componentDidMount() {

    AppState.addEventListener('change', this._handleAppStateChange);
    this._getUserStatus();

    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);

    setInterval(() => {
      this.setState({
        currentTime: moment().format('DD-MM-YYYY HH:mm:ss')
      });
    }, 1000)
  }

  render() {
    const {navigation} = this.props;
    return (
      <ImageBackground source={require('../../assets/images/bg.jpg')} style={{width: '100%', height: '100%'}}>
        <SafeAreaView style={styles.mainLogin}>
          <Header/>
          <View style={styles.wrapperLogin}>
            <View style={styles.sectionLogin}>
              {this.state.keyboardState == 'closed' ?
                navigation.getParam('employeeAvatar') != null ?
                  <Image
                    style={styles.avatarImage}
                    source={{uri: navigation.getParam('employeeAvatar')}}
                  />
                  :
                  <Image
                    style={styles.avatarImage}
                    source={require('../../assets/images/avatar.png')}
                  />
                :
                null
              }
              {this.state.keyboardState == 'closed' ?
                <TouchableOpacity
                  style={styles.logOut}
                  onPress={() => {
                    this.logout()
                  }}
                >
                  <Ionicons name='ios-log-out' size={20} color='#e60012'/>
                </TouchableOpacity>
                :
                null
              }
              <View style={styles.userInfo}>
                {/*<Text style={styles.userText}>User prop: {navigation.getParam('employeeId')}</Text>*/}
                <Text style={styles.userText}>User: {navigation.getParam('employeeName')}</Text>
                <Text style={styles.userText}>Time: {this.state.currentTime}</Text>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="Note"
                onChangeText={(note) => this.setState({note})}
                value={this.state.note}
                onSubmitEditing={Keyboard.dismiss}
              />

              <View style={styles.inlineContainer}>
                {this.state.is_punched_in != null ?
                  <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => {
                      this.punched(
                        navigation.getParam('employeeId'),
                        this.state.is_punched_in ? Constant.apiCheckOut : Constant.apiCheckIn
                      )
                    }}
                    disabled={this.state.progress}
                  >
                    {this.state.progress ?
                      <ActivityIndicator size="small" color="#fff" style={{marginRight: 10}}/>
                      : null}
                    <Text style={styles.textButton}>Check {this.state.is_punched_in ? 'out' : 'in'}</Text>
                  </TouchableOpacity>
                  :
                  <ActivityIndicator size="small" color="#e60012" style={{marginTop: 10}}/>
                }
                <TouchableOpacity style={styles.btnRefresh} onPress={() => {
                  this._getUserStatus()
                }}>
                  <Ionicons name="ios-refresh" size={23} color="white"/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Action: ActionScreen,
    History: HistoryScreen,
    //Login: LoginScreen
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Action') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'History') {
          iconName = `ios-list${focused ? '' : '-box'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={20} color={tintColor}/>;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#e60012',
      inactiveTintColor: '#7b7b7b'
    },
  }
);
export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  mainLogin: {
    flex: 1
  },
  wrapperLogin: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -75,
  },
  avatarImage: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: -75,
    borderRadius: 400 / 2,
    borderColor: '#CCC',
    borderWidth: 3,
  },
  sectionLogin: {
    marginTop: 115,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f494',
    borderRadius: 20,
    maxWidth: 320,
    width: '80%',
    paddingTop: 95,
    paddingBottom: 30,
  },
  inlineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  btnRefresh: {
    marginTop: 10,
    marginLeft: 10,
    width: 45,
    height: 45,
    backgroundColor: '#e60012',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  selectButton: {
    width: 140,
    height: 45,
    justifyContent: 'center',
    backgroundColor: '#e60012',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    marginTop: 10,
  },
  logOut: {
    backgroundColor: 'white',
    width: 38,
    height: 38,
    top: -47,
    right: -40,
    borderRadius: 400 / 2,
    borderWidth: 2,
    borderColor: '#CCC',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    borderRadius: 5,
    width: '80%',
    maxWidth: 400,
    height: 50,
    fontSize: 16,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  textButton: {
    color: 'white',
    fontSize: 16,
  },
  userInfo: {
    marginTop: -20
  },
  userText: {
    marginBottom: 12,
    fontSize: 16,

  }
});
