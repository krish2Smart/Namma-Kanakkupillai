import React from 'react';
import { 
	TRANSACTION_UPDATE,
	TRANSACTION_CREATE,
	LOAD_NEW_TRANSACTION
} from '../actions/types';


const INITIAL_STATE = {
	date : '',
	amount : 0,
	notes : '',
	type : '',
	category : '',
	categoryPicker : false,
	loading : false
};

export default(state = INITIAL_STATE, action) => {
	switch(action.type) {
		case TRANSACTION_UPDATE :
			if(action.payload.prop === "type") {
				if(action.payload.value === "Expense")
					return { ...state, [action.payload.prop] : action.payload.value, categoryPicker : true };
				else
					return { ...state, [action.payload.prop] : action.payload.value, categoryPicker : false };
			}
			return { ...state, [action.payload.prop] : action.payload.value };
		case TRANSACTION_CREATE :
			return { ...INITIAL_STATE, loading : true };
		case LOAD_NEW_TRANSACTION :
			return INITIAL_STATE;
		default :
			return state;
	}
}