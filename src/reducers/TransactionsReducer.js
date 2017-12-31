import React from 'react';
import { 
	TRANSACTIONS_FETCH, 
	DATE_CHANGED,
	ADD_MONEY,
	LOAD_NEW_TRANSACTION
} from '../actions/types';

const INITIAL_STATE = { 
	fromDate : new Date(new Date().getFullYear(), new Date().getMonth(), 1),
	toDate : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
	income : 0,
	expense : 0,
	loading : true
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case TRANSACTIONS_FETCH :
			return { ...state, loading : false, value : action.payload};
		case DATE_CHANGED : 
			return { ...state, [action.payload.prop] : action.payload.value, income : 0, expense : 0 };
		case ADD_MONEY :
			let value;
			if(action.payload.prop === "expense")
				value = action.payload.value + state.expense;
			else
				value = action.payload.value + state.income;
			return { ...state, [action.payload.prop] : value };	
		default :
			return state;
	}
}
