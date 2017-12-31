import React from 'react';
import { Text, View } from 'react-native';

const Header = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    marginLeft : 40,
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
    height: 60,
    paddingTop: 15,
    shadowOpacity: 0.2,
    elevation: 2
  },
  textStyle: {
    paddingLeft : 10,
    fontSize: 20,
    color : 'white'
  }
};

export default Header;
