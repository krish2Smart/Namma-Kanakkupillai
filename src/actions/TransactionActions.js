import React from 'react';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
	TRANSACTION_UPDATE,
	TRANSACTION_CREATE,
	TRANSACTIONS_FETCH,
	LOAD_NEW_TRANSACTION,
	DATE_CHANGED,
	ADD_MONEY
} from './types';


export const transactionUpdate = ({prop, value}) => {
	console.log(value);
	if(value.toString() === "NaN")
		value = '';
	return {
		type : TRANSACTION_UPDATE,
		payload : { prop, value }
	};
};

export const transactionCreate = ({ date, amount, type, category, notes }) => {
	return(dispatch) => {
		dispatch({ type : TRANSACTION_CREATE });
		const { currentUser } = firebase.auth();
		let currentDate = new Date(Date.parse(date));
		let day = new Date(currentDate).getDate();
  		day = day<10?0+""+day:day;
  		let mon = currentDate.getMonth()+1;
  		mon = mon<10?0+""+mon:mon;
		const datePath = currentDate.getFullYear()+"-"+mon+"-"+day;
		if(type === "Expense") {
			firebase.database().ref(`/users/${currentUser.uid}/transactions/${datePath}`)
				.push({amount : amount, type, category, notes})
				.then(() => {
					Actions.transactions({ type : 'reset' });
				});
		} else {
			firebase.database().ref(`/users/${currentUser.uid}/transactions/${datePath}`)
				.push({amount, type, notes})
				.then(() => {
					Actions.transactions({ type : 'reset' });
				});
		} 		
	};
};

export const transactionsFetch = () => {
	return(dispatch) => {
		const { currentUser } = firebase.auth();
		firebase.database().ref(`/users/${currentUser.uid}/transactions`)
			.on('value', snapshot => {
				dispatch ({ type : TRANSACTIONS_FETCH, payload : snapshot.val() });
			});
	};
};

export const loadNewTransaction = () => {
	Actions.newTransaction();
	return {
		type : LOAD_NEW_TRANSACTION
	};
};

export const dateChanged = ({prop, value}) => {
	return {
		type : DATE_CHANGED,
		payload : { prop, value }
	};
};


export const addMoney = ({prop, value}) => {
	return {
		type : ADD_MONEY,
		payload : { prop, value }
	};
};
