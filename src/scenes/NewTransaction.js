import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	TouchableOpacity,
	TextInput,
	Picker,
	Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { transactionUpdate, transactionCreate } from '../actions';
import Drawer from '../components/Drawer';
import DatePicker from '../components/DatePicker';
import Spinner from '../components/Spinner';

class NewTransaction extends Component {

	renderCategoryPicker() {
		if(this.props.categoryPicker) {
			return (
				<View style = {styles.containerTwo}>
					<Text style = {styles.label}>Category</Text>
					<Picker 
						style = {styles.picker}
						selectedValue = {this.props.category}
						onValueChange = {value => this.props.transactionUpdate({prop : 'category', value})}
						>
						<Picker.Item label="Food" value="Food" />
						<Picker.Item label="Gifts" value="Gifts" />
						<Picker.Item label="Groceries" value="Groceries" />
						<Picker.Item label="Rent" value="Rent" />
						<Picker.Item label="Shopping" value="Shopping" />
						<Picker.Item label="Travel" value="Travel" />
					</Picker>
				</View>
			);
		}
	}

	onPressSubmit() {

		const { 
			date, 
			amount, 
			type, 
			category, 
			notes 
		} = this.props;

		if(this.props.action) {
			if(this.props.expensePicked)
				this.props.transactionCreate({ date, amount, type, category : category || 'Food', notes });
			else
				this.props.transactionCreate({ date, amount, type : type || 'Income', category : '', notes });
		}
		else//Rememberance to display error
			console.log("Enter Date");
	}

	transactionForm() {
		return (
			<View style = {{flex:1}}>
				<KeyboardAwareScrollView style = {styles.container}>
					<View style = {styles.containerTwo}>
						<DatePicker
							date = {this.props.date}
							style = {styles.calendar}
							onDateChange = {value => this.props.transactionUpdate({prop : 'date', value})}
							/>
						<TextInput 
							style = {styles.amountInput}
							underlineColorAndroid = "black" 
							placeholder = "Amount"
							keyboardType = "numeric"
							value = { this.props.amount.toString() }
							onChangeText = {value => this.props.transactionUpdate({prop : 'amount', value : parseInt(value)})}
							/>
					</View>
					<View style = {styles.containerTwo}>
						<Text style = {styles.label}>Type</Text>
						<Picker
							style = {styles.picker}
							selectedValue = {this.props.type}
							onValueChange = {value => this.props.transactionUpdate({prop : 'type', value})}
							>
							<Picker.Item label="Income" value="Income" />
						 	<Picker.Item label="Expense" value="Expense" />
						</Picker>
					</View>
					{this.renderCategoryPicker()}
					<View>
						<TextInput 
							placeholder = "Notes" 
							style = {styles.notesInput}
							underlineColorAndroid = "black"
							value = { this.props.notes }
							onChangeText = {value => this.props.transactionUpdate({prop : 'notes', value})}
							/>
					</View>
				</KeyboardAwareScrollView>
				<View style = {styles.addButtonContainer}>
					<TouchableHighlight style = {styles.addButton} onPress = {this.onPressSubmit.bind(this)}>
						<Image source = {require('../images/tick.png')} resizeMode="cover"/>
					</TouchableHighlight>		
				</View>
			</View>
		);
	}

	render() {
		if(this.props.loading) {
			return <Spinner/>
		} else {
			return (
				<Drawer
					renderContent = {this.transactionForm()}
					headerText = "New Transactions"
				/>
			);
		}	
	}
}

const styles = StyleSheet.create({
	container : {
		flex : 1
	},
	drawer : {
	},
	containerTwo : {
		flexDirection : 'row',
		marginTop : 20
	},
	calendar : {
		flex : 1,
		marginLeft : 15
	},
	amountInput : {
		flex : 1,
		marginHorizontal : 15,
		height : 50,
		fontSize : 20
	},
	label : {
		flex : 1,
		fontSize : 20,
		marginTop : 10,
		marginLeft : 20
	},
	picker : {
		flex : 1,
		marginHorizontal : 15
	},
	notesInput : {
		flex : 1,
		marginHorizontal : 15,
		fontSize : 20,
		marginTop : 10
	},
	addButtonContainer : {
		position : 'absolute',
		right : 15,
		bottom : 20,
		padding : 10,
		backgroundColor : '#2c3e50',
		borderRadius : 50,
		elevation: 8
	},
	errMsg : {
		textAlign : 'center',
		color : 'red'
	},
	drawerButton : {
    position : 'absolute',
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width : 40,
    paddingTop: 15,
    shadowOpacity: 0.2,
    elevation: 2
  }
});

const drawerStyles = {
  drawer: {
    backgroundColor: "#2c3e50"
  }
};

const mapStateToProps = (state, ownProps) => {
	const {
		date,
		amount,
		type,
		category,
		notes,
		categoryPicker,
		loading
	} = state.transactionForm;

	const action = date !== "";
	const expensePicked = type === "Expense";

	console.log(amount);

	return { 
		date,
		amount,
		type,
		category,
		notes,
		categoryPicker,
		loading,
		action, 
		expensePicked
	};
}

export default connect( mapStateToProps, { transactionUpdate, transactionCreate })(NewTransaction);