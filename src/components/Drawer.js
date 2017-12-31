import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Drawer from 'react-native-drawer';
import MyControlPanel from './ControlPanel';
import Header from './Header'; 

const DrawerComponent = (props) => {
  return (
    <Drawer
      type="overlay"
      styles={drawerStyles}
      tapToClose={true}
      ref={(ref) => this._drawer = ref}
      content={<MyControlPanel />}
      openDrawerOffset={0.4}
      panCloseMask={0.4}
      panOpenMask = {0.2}
      panThreshold = {0.2}
      elevation = {0.3}
      >
      <TouchableOpacity style = {styles.drawerButton} onPress = {() => this._drawer.open()}>
        <Image
          source = {require('../images/menu.png')}
          />
      </TouchableOpacity>
      <Header headerText = {props.headerText}/>
      {props.renderContent}
    </Drawer>
  );
};

const drawerStyles = {
  drawer: {
    backgroundColor: "#2c3e50"
  }
};

const styles = StyleSheet.create({
  drawerButton : {
    position : 'absolute',
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width : 40,
    paddingTop: 15,
    shadowOpacity: 0.2,
    elevation: 2
  }
});

export default DrawerComponent;