"use strict";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  View
} from "react-native";
import Header from "../components/Header";
import React, {Component} from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';

const moment = require('moment');
const START_WORK_TIME = '09:00';
const END_WORK_TIME = '18:00';
const DATA = [
  {
    id: '1',
    date: '01-12-2019',
    in: '09:15',
    out: '19:55'
  },
  {
    id: '2',
    date: '02-12-2019',
    in: '08:45',
    out: '17:55'
  },
  {
    id: '3',
    date: '03-12-2019',
    in: '08:45',
    out: '18:00'
  },
  {
    id: '4',
    date: '04-12-2019',
    in: '08:45',
    out: '18:22'
  },
  {
    id: '5',
    date: '05-12-2019',
    in: '09:45',
    out: '18:22'
  },
  {
    id: '6',
    date: '06-12-2019',
    in: '08:45',
    out: '18:22'
  },
  {
    id: '7',
    date: '07-12-2019',
    in: '08:45',
    out: '18:22'
  },
  {
    id: '8',
    date: '08-12-2019',
    in: '08:45',
    out: '18:22'
  },
  {
    id: '9',
    date: '09-12-2019',
    in: '08:45',
    out: '18:22'
  },
  {
    id: '10',
    date: '10-12-2019',
    in: '08:45',
    out: '18:22'
  }
];


export default class History extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ImageBackground source={require('../../assets/images/bg.jpg')} style={{width: '100%', height: '100%'}}>
        <SafeAreaView style={styles.mainLogin}>
          <Header/>
          <FlatList
            style={styles.historySection}
            data={DATA}
            renderItem={
              ({item}) =>
                <View>
                  <Text style={styles.historyItem}>{item.date}</Text>
                  <View style={styles.historyIn}>
                    <Text style={{color: '#CCC', fontSize: 12}}>{item.in}</Text>
                    {moment(item.in, 'hh:mm') > moment(START_WORK_TIME, 'hh:mm') ?
                      <View style={styles.iconIn}>
                        <Ionicons name='md-warning' size={16} color='#e60012'/>
                      </View>
                      : null
                    }
                  </View>
                  <View style={styles.historyOut}>
                    <Text style={{color: '#FFF'}}>{item.out}</Text>
                    {moment(item.out, 'hh:mm') < moment(END_WORK_TIME, 'hh:mm') ?
                      <View style={styles.iconOut}>
                        <Ionicons name='md-warning' size={20} color='#e60012'/>
                      </View>
                      : null
                    }
                  </View>
                </View>
            }
          />
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  mainLogin: {
    flex: 1,
    alignItems: 'center'
  },
  historySection: {
    width: '90%',
    marginBottom: 20,
  },
  historyItem: {
    backgroundColor: '#282c34',
    padding: 10,
    color: 'white',
    marginBottom: 10,
    height: 50,
    lineHeight: 30,
    borderRadius: 5,
  },
  historyIn: {
    position: 'absolute',
    flexDirection: 'row',
    top: 4,
    right: 10,
    width: 60,
    height: 25,
    lineHeight: 25
  },
  historyOut: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 10,
    right: 10,
    width: 60,
    height: 25,
    lineHeight: 25
  },
  iconIn: {
    width: 42,
    height: 20,
    alignItems: 'center'
  },
  iconOut: {
    width: 30,
    height: 20,
    alignItems: 'center',
  }
});
