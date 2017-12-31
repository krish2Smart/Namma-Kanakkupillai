import React from "react";
import { 
	View,
	Text,
	StyleSheet
} from 'react-native';


const Net = ({income, expense}) => {
	return (
		<View style = {styles.container}>
			<View style = {styles.section}>
				<Text style = {styles.label}>Income</Text>
				<View style = {styles.alignRight}><Text style = {styles.greenText}>{income}</Text></View>
			</View>
			<View style = {styles.section}>
				<Text style = {styles.label}>Expense</Text>
				<View style = {styles.alignRight}><Text style = {styles.redText}>{expense}</Text></View>
			</View>
			<View style = {styles.section}>
				<Text style = {styles.label}>Balance</Text>
				<View style = {styles.alignRight}><Text style = {styles.greenText}>{income-expense}</Text></View>
			</View>
		</View>
	);
};


const styles = StyleSheet.create({
	section : {
		flexDirection : 'row',
		paddingHorizontal : 10,
		paddingVertical : 0
	},
	label : {
		fontWeight : 'bold',
    	fontSize : 15
	},
	alignRight : {
		flex : 1,
	    justifyContent : 'flex-end',
	    alignItems : 'flex-end'
	},
	greenText : {
		fontSize : 15,
		color : '#1E824C'
	},
	redText : {
		fontSize : 15,
		color : '#F03434'
	}

});

export default Net;