import _ from 'lodash';
import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	Image,
	ListView,
	TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { transactionsFetch, loadNewTransaction, dateChanged, addMoney } from '../actions'
import DatePicker from '../components/DatePicker';
import ListItem from '../components/ListItem';
import Drawer from '../components/Drawer';
import Spinner from '../components/Spinner';
import Net from '../components/Net';


class Transactions extends Component {

	componentWillMount() {
		this.props.transactionsFetch();
		this.createDataSource(this.props);
	}

	updateDetails() {
		const { fDate, tDate } = this.props;
	    let date, expense = 0, income = 0;
		_.map(this.props.transactions, (trans1, uid) => {
			date = trans1.date;
			if(date >= fDate && date <= tDate) {
				_.map(trans1, (trans2, uid) => {
					if(trans2 !== date) {
						if(trans2.type === "Expense")
							expense += trans2.amount;
						else
							income += trans2.amount;
					}
				});
			}
		});
		this.props.addMoney({prop : 'expense', value : expense});
		this.props.addMoney({prop : 'income', value : income});
	}

	componentWillReceiveProps(nextProps) {
		this.createDataSource(nextProps);
	}

	createDataSource({ transactions }) {
	    const ds = new ListView.DataSource({
	      rowHasChanged: (r1, r2) => r1 !== r2
	    });

	    this.dataSource = ds.cloneWithRows(transactions);
	  }

	  renderRow(transactions) {
	    return <ListItem transactions = { transactions } />;
	  }

	  renderList() {
	  	if(this.props.loading) {
	  		return (
	  			<Spinner/>
	  		);
	  	} else {
	  		return (
	  			<ListView
				    enableEmptySections
				    dataSource={this.dataSource}
				    renderRow={this.renderRow}
				  />
	  		);
	  	}
	  }

	transactions() {
		return (
			<View style = {styles.container}>
				<View style = {styles.calendarContainer}>
					<DatePicker 
						date = {this.props.fromDate} 
						style = {styles.calendarLeft} 
						onDateChange = {value => {
								this.props.dateChanged({prop : 'fromDate', value})
								this.updateDetails();
							}}
						/>
					<Text style = {styles.calendarText}>to</Text>
					<DatePicker
						date = {this.props.toDate}
						style = {styles.calendarRight}
						onDateChange = {value => {
								this.props.dateChanged({prop : 'toDate', value})
								this.updateDetails();
							}}
						/>
				</View>
				<Net income = {this.props.income} expense = {this.props.expense}/>
				<Text style = {styles.title}>Transactions</Text>
				{this.renderList()}
				<TouchableOpacity 
					onPress = {() => this.props.loadNewTransaction()} 
					style = {styles.addButtonContainer}
					>
					<Image source = {require('../images/plus.png')} resizeMode="cover"/>
				</TouchableOpacity>
			</View>
		);
	}


	render() {
		return (
			<Drawer
				renderContent = {this.transactions()}
				headerText = "Transactions"
				/>
		);
	}
}

const styles = StyleSheet.create({
	container : {
		flex : 1,
		backgroundColor : "white"
	},
	calendarContainer : {
		flexDirection : 'row'
	},
	calendarLeft : {
		flex : 1,
		alignItems : 'flex-start',
		marginLeft : 10,
		marginVertical : 15
	},
	calendarRight : {
		flex : 1,
		alignItems : 'flex-end',
		marginRight : 10,
		marginVertical : 15
	},
	calendarText : {
		paddingVertical : 20,
		flex : 1,
		textAlign : 'center',
		fontSize : 20
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
	title : {
		paddingTop : 10,
		fontSize : 15,
		fontWeight : 'bold',
		paddingLeft : 10
	}
});

const mapStateToProps = state => {
	const { 
		fromDate, 
		toDate, 
		loading, 
		income, 
		expense 
	} = state.transactions;

	let day = new Date(fromDate).getDate();
	day = day<10?0+""+day:day;
	let mon = new Date(fromDate).getMonth()+1;
	mon = mon<10?0+""+mon:mon;
	let fDate = new Date(fromDate).getFullYear()+"-"+mon+"-"+day;
	day = new Date(toDate).getDate();
	day = day<10?0+""+day:day;
	mon = new Date(toDate).getMonth()+1;
	mon = mon<10?0+""+mon:mon;
	let tDate = new Date(toDate).getFullYear()+"-"+mon+"-"+day;

	const transactions = _.map(state.transactions.value, (val, date) => {
		return { ...val, date };
	});
	
	return { 
		transactions, 
		fromDate, 
		toDate, 
		fDate, 
		tDate, 
		loading, 
		income, 
		expense
	};
};

export default connect(mapStateToProps, { 
	transactionsFetch,
	loadNewTransaction,
	dateChanged,
	addMoney 
})(Transactions);