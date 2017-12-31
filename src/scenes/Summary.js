import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { dateChanged, addMoney } from '../actions';
import Drawer from '../components/Drawer';
import DatePicker from '../components/DatePicker';
import Net from '../components/Net';



class Summary extends Component {

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

	summary() {
		return (
			<View>
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
				<Text style = {styles.title}>Net</Text>
				<Net income = {this.props.income} expense = {this.props.expense}/>
			</View>
		)
	}

	render() {
		return (
			<Drawer
				renderContent = {this.summary()}
				headerText = "Summary"
				/>
		);
	}

}

const styles = StyleSheet.create({
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
	title : {
		fontSize : 20,
		fontWeight : 'bold',
		paddingLeft : 10
	}
});

const mapStateToProps = state => {
	const { 
		fromDate,
		toDate,
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
		income, 
		expense
	};
};


export default connect(mapStateToProps, { dateChanged, addMoney })(Summary);