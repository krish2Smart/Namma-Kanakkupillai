/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppRegistry
} from 'react-native';
import LoginScreen from './scenes/LoginScreen';
import SignupScreen from './scenes/SignupScreen';

export default class App extends Component {
  render() {
    return (
        <SignupScreen/>
    );
  }
}

AppRegistry.registerComponent('App', () => App);