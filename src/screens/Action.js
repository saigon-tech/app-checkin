import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  Keyboard,
  ActivityIndicator,
  AppState,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Header from "../components/Header";
import React, {Component} from "react";
import axios from "axios";

const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Ho_Chi_Minh');
const Colors = require('../../assets/styles/Colors');
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
    is_punched_in: null,
    modalVisible: false,
    modalTitle: '',
    modalContent: '',
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

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

  async punched(employeeId, url) {
    const apiUrl = url.replace('{employeeId}', employeeId);
    let body = {
      timezone: 'Asia/Ho_Chi_Minh',
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
        self.setState({
          modalVisible: true,
          modalTitle: 'Success',
          modalContent: 'Punched'
        });
      } else {
        self.setState({
          modalVisible: true,
          modalTitle: 'Error',
          modalContent: response.data.error.text
        });
      }
      self.setState({progress: false});
    })
      .catch(function (error) {
        self.setState({
          modalVisible: true,
          modalTitle: 'Error Network',
          modalContent: 'Can\'t punched'
        });
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
        self.setState({
          modalVisible: true,
          modalTitle: 'Error',
          modalContent: response.data.error.text
        });
      }
    })
      .catch(function (error) {
        self.setState({
          modalVisible: true,
          modalTitle: 'Network Error',
          modalContent: 'Can\'t get User Info'
        });
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
      <ImageBackground source={require('../../assets/images/bg.jpg')} style={appStyle.mainWrapper}>
        <SafeAreaView style={appStyle.mainLogin}>
          <Header/>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setModalVisible(false);
            }}
            >
            <TouchableWithoutFeedback
              onPress={() => {
                this.setModalVisible(false);
              }}>
              <View style={appStyle.containerModal}>
                <View style={appStyle.contentModal} >
                  <View style={appStyle.headerModal} >
                    <Text style={appStyle.headerText}>{this.state.modalTitle} !</Text>
                  </View>
                  <View style={appStyle.bodyModal} >
                    <Text style={appStyle.bodyText}>{this.state.modalContent}</Text>
                  </View>
                  <View style={appStyle.footerModal} >
                    <TouchableOpacity
                      onPress={() => {
                        this.setModalVisible(false);
                      }}>
                      <Text style={appStyle.headerText}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          <View style={appStyle.wrapperAction}>
            <View style={appStyle.sectionAction}>
              {this.state.keyboardState == 'closed' ?
                navigation.getParam('employeeAvatar') != null ?
                  <Image
                    style={appStyle.avatarImage}
                    source={{uri: navigation.getParam('employeeAvatar')}}
                  />
                  :
                  <Image
                    style={appStyle.avatarImage}
                    source={require('../../assets/images/avatar.png')}
                  />
                :
                null
              }
              {this.state.keyboardState == 'closed' ?
                <TouchableOpacity
                  style={appStyle.logOut}
                  onPress={() => {
                    this.logout()
                  }}
                >
                  <Ionicons name='ios-log-out' size={20} color={Colors.red} />
                </TouchableOpacity>
                :
                null
              }
              <View style={appStyle.userInfo}>
                <Text style={appStyle.userText}>User: {navigation.getParam('employeeName')}</Text>
                <Text style={appStyle.userText}>Time: {this.state.currentTime}</Text>
              </View>
              <TextInput
                style={appStyle.textInput}
                placeholder="Note"
                onChangeText={(note) => this.setState({note})}
                value={this.state.note}
                onSubmitEditing={Keyboard.dismiss}
              />

              <View style={appStyle.inlineContainer}>
                {this.state.is_punched_in != null ?
                  <TouchableOpacity
                    style={appStyle.selectButton}
                    onPress={() => {
                      this.punched(
                        navigation.getParam('employeeId'),
                        this.state.is_punched_in ? Constant.apiCheckOut : Constant.apiCheckIn
                      )
                    }}
                    disabled={this.state.progress}
                  >
                    {this.state.progress ?
                      <ActivityIndicator size="small" color={Colors.white} style={{marginRight: 10}}/>
                      : null}
                    <Text style={appStyle.textButton}>Check {this.state.is_punched_in ? 'out' : 'in'}</Text>
                  </TouchableOpacity>
                  :
                  <ActivityIndicator size="small" color={Colors.red} style={{marginTop: 10}}/>
                }
                <TouchableOpacity style={appStyle.btnRefresh} onPress={() => {
                  this._getUserStatus()
                }}>
                  <Ionicons name="ios-refresh" size={20} color={Colors.white} />
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
    History: HistoryScreen
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
      activeTintColor: Colors.red,
      inactiveTintColor: Colors.tabInactive
    },
  }
);
export default createAppContainer(TabNavigator);
