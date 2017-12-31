import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';


class ControlPanel extends Component {
    render() {
      return (
        <View style = {styles.tabContainer}>
          <TouchableOpacity style = {styles.tab} onPress = {() => Actions.transactions({ type : 'reset' })}>
            <Text style = {styles.tabText}>
              Transactions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.tab} onPress = {() => Actions.summary({ type : 'reset' })}>
            <Text style = {styles.tabText}>
              Summary
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.tab} onPress = {() => this.props.logoutUser()}>
            <Text style = {styles.tabText}>
              Logout
            </Text>
          </TouchableOpacity>
        </View> 
      )
    };  
}

const styles = StyleSheet.create({
  tabContainer : {
    marginTop : 10
  },
  tab : {
    overflow : "hidden",
    height : 40,
    justifyContent : 'center',
    backgroundColor: '#95a5a6',
    paddingLeft : 20,
    marginVertical : 10, 
    borderStyle: 'solid',
    borderBottomLeftRadius: 50
  },
  tabText : {
    fontSize : 17
  }
});

export default connect(null, { logoutUser })(ControlPanel);