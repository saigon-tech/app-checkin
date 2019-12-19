"use strict";
import {
  ImageBackground,
  SafeAreaView,
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
      <ImageBackground source={require('../../assets/images/bg.jpg')} style={appStyle.mainWrapper}>
        <SafeAreaView style={appStyle.mainHome}>
          <Header/>
          <FlatList
            style={appStyle.historySection}
            data={DATA}
            renderItem={
              ({item}) =>
                <View>
                  <Text style={appStyle.historyItem}>{item.date}</Text>
                  <View style={appStyle.historyIn}>
                    <Text style={{color: Colors.grey, fontSize: 12}}>{item.in}</Text>
                    {moment(item.in, 'hh:mm') > moment(START_WORK_TIME, 'hh:mm') ?
                      <View style={appStyle.iconIn}>
                        <Ionicons name='md-warning' size={16} color={Colors.red}/>
                      </View>
                      : null
                    }
                  </View>
                  <View style={appStyle.historyOut}>
                    <Text style={{color: Colors.white}}>{item.out}</Text>
                    {moment(item.out, 'hh:mm') < moment(END_WORK_TIME, 'hh:mm') ?
                      <View style={appStyle.iconOut}>
                        <Ionicons name='md-warning' size={20} color={Colors.red}/>
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
