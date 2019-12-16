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

const DATA = [
  {
    id: 1,
    date: '01-12-2019',
    in: '08:45',
    out: '18:22'
  },
  {
    id: 2,
    date: '02-12-2019',
    in: '08:45',
    out: '18:22'
  },
  {
    id: 3,
    date: '03-12-2019',
    in: '08:45',
    out: '18:22'
  },
  {
    id: 4,
    date: '04-12-2019',
    in: '08:45',
    out: '18:22'
  },
  {
    id: 5,
    date: '05-12-2019',
    in: '08:45',
    out: '18:22'
  },
  {
    id: 6,
    date: '06-12-2019',
    in: '08:45',
    out: '18:22'
  },
  {
    id: 7,
    date: '07-12-2019',
    in: '08:45',
    out: '18:22'
  },
  {
    id: 8,
    date: '08-12-2019',
    in: '08:45',
    out: '18:22'
  },
  {
    id: 9,
    date: '09-12-2019',
    in: '08:45',
    out: '18:22'
  },
  {
    id: 10,
    date: '10-12-2019',
    in: '08:45',
    out: '18:22'
  },
  {
    id: 11,
    date: '11-12-2019',
    in: '08:45',
    out: '18:22'
  },
  {
    id: 12,
    date: '12-12-2019',
    in: '08:45',
    out: '18:22'
  },
  {
    id: 13,
    date: '13-12-2019',
    in: '08:45',
    out: '18:22'
  },
  {
    id: 14,
    date: '14-12-2019',
    in: '08:45',
    out: '18:22'
  },
  {
    id: 15,
    date: '15-12-2019',
    in: '08:45',
    out: '18:22'
  },
];


export default class History extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ImageBackground source={require('../../assets/images/bg.jpg')} style={{width: '100%', height: '100%'}}>
        <SafeAreaView style={styles.mainLogin}>
          <Header />
          <FlatList
            style={styles.historySection}
            data={DATA}
            renderItem={
              ({ item }) =>
                <View>
                  <Text style={styles.historyItem}>{item.date}</Text>
                  <Text style={styles.historyIn}>{item.in}</Text>
                  <Text style={styles.historyOut}>{item.out}</Text>
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
    color: '#CCC',
    position: 'absolute',
    top: 0,
    right: 0,
    width: 60,
    height: 25,
    fontSize: 12,
    lineHeight: 25
  },
  historyOut: {
    color: 'white',
    position: 'absolute',
    bottom: 10,
    right: 0,
    width: 60,
    height: 25,
    lineHeight: 25
  },
});
