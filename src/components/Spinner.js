import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

const Spinner = () => {
	return (
		<ActivityIndicator style = {styles.spinnerStyle} size = "large"/>
	);
};

const styles = StyleSheet.create({
	spinnerStyle : {
		flex : 1,
		justifyContent : 'center',
		alignItems : 'center'
	},
});

export default Spinner;


