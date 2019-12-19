'use strict';
import {StyleSheet} from 'react-native';
import Colors from './Colors';

module.exports = StyleSheet.create({
  /* Wrapper */
  mainWrapper: {
    width: '100%',
    height: '100%'
  },

  /* Header */
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

  /* Home */
  mainHome: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center'
  },
  activityHome: {
    marginRight: 15,
    marginBottom: 15
  },

  /* Login */
  mainLogin: {
    flex: 1,
  },
  sectionWarning: {
    backgroundColor: Colors.red,
    padding: 20,
    marginBottom: 30,
    width: '100%',
  },
  textWarning: {
    color: Colors.white,
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
    backgroundColor: Colors.white,
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
    backgroundColor: Colors.white,
  },
  selectButton: {
    height: 40,
    justifyContent: 'center',
    backgroundColor: Colors.red,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
  },
  textButton: {
    color: Colors.white,
    fontSize: 15,
  },

  /* Action */
  wrapperAction: {
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
    borderColor: Colors.grey,
    borderWidth: 3,
  },

  sectionAction: {
    marginTop: 115,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.greyOpacity,
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
    marginLeft: 10,
    width: 40,
    height: 40,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  logOut: {
    backgroundColor: Colors.white,
    width: 38,
    height: 38,
    top: -47,
    right: -40,
    borderRadius: 400 / 2,
    borderWidth: 2,
    borderColor: Colors.grey,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userInfo: {
    marginTop: -20
  },
  userText: {
    marginBottom: 12,
    fontSize: 16,
  },

  /* History */
  historySection: {
    width: '90%',
    marginBottom: 20,
  },
  historyItem: {
    backgroundColor: Colors.black,
    padding: 10,
    color: Colors.white,
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
