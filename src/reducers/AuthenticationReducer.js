import { 
	EMAIL_CHANGED, 
	PASSWORD_CHANGED, 
	CONFIRM_PASSWORD_CHANGED, 
	LOGIN_PAGE, 
	LOGIN_SUCCESS, 
	LOGIN_FAIL, 
	LOGIN_START, 
	SIGNUP_PAGE, 
	SIGNUP_SUCCESS, 
	SIGNUP_FAIL, 
	SIGNUP_START,
	LOGOUT_USER 
} from '../actions/types';

const INITIAL_STATE = { 
	email : '', 
	password : '', 
	confirmPassword : '',
	user : null,
	loading : false,
	err : ''
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case EMAIL_CHANGED :
			return { ...state, email : action.payload };
		case PASSWORD_CHANGED :
			return { ...state, password : action.payload };
		case CONFIRM_PASSWORD_CHANGED :
			return { ...state, confirmPassword : action.payload };
		case LOGIN_PAGE :
			return INITIAL_STATE;
		case LOGIN_START :
			return { ...state, loading : true, err : '' };
		case LOGIN_SUCCESS :
			return { ...state, ...INITIAL_STATE, user : action.payload };
		case LOGIN_FAIL :
			return  { ...state, password : '', loading : false, err : 'Invalid username or password' };
		case SIGNUP_PAGE :
			return INITIAL_STATE;
		case SIGNUP_START :
			return { ...state, loading : true, err : '' };
		case SIGNUP_SUCCESS :
			return { ...state, ...INITIAL_STATE, user : action.payload };
		case SIGNUP_FAIL :
			return  { ...state, password : '', confirmPassword : '', loading : false, err : 'Invalid Mail ID' };
		case LOGOUT_USER :
			return INITIAL_STATE;
		default :
			return state;
	}
};