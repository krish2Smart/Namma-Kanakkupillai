import { combineReducers } from 'redux';
import AuthenticationReducer from  './AuthenticationReducer';
import TransactionFormReducer from  './TransactionFormReducer';
import TransactionsReducer from './TransactionsReducer';

export default combineReducers ({
	authentication : AuthenticationReducer,
	transactionForm : TransactionFormReducer,
	transactions : TransactionsReducer
});