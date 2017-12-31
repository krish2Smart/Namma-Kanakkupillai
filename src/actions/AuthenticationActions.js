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
} from './types';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const emailChanged = (text) => {
	return {
		type: EMAIL_CHANGED,
		payload: text
	};
};

export const passwordChanged = (text) => {
	return {
		type : PASSWORD_CHANGED,
		payload : text
	};
};

export const confirmPasswordChanged = (text) => {
	return {
		type : CONFIRM_PASSWORD_CHANGED,
		payload : text
	};
};

export const loginPage = () => {
	Actions.pop();
	return {
		type : LOGIN_PAGE
	};
};

export const loginUser = ({ email, password }) => {
	return (dispatch) => {
		dispatch({ type : LOGIN_START });
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(user => loginSuccess(dispatch, user))
			.catch(() => loginFail(dispatch));
	};
};

export const signupPage = () => {
	Actions.signup();
	return {
		type : SIGNUP_PAGE
	};
};

export const signupUser = ({ email, password, confirmPassword }) => {
	return (dispatch) => {
		dispatch({ type : SIGNUP_START });
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(user => signupSuccess(dispatch, user))
			.catch(() => signupFail(dispatch));
	};
};

export const logoutUser = () => {
	return(dispatch) => {
		firebase.auth().signOut()
			.then(() => dispatch({type : LOGOUT_USER}));
		Actions.authentication({type : 'reset'});
	}
}


const loginSuccess = (dispatch, user) => {
	dispatch({
		type : LOGIN_SUCCESS,
		payload : user
	});
	Actions.main({ type : 'reset'});
};

const loginFail = (dispatch) => {
	dispatch({
		type : LOGIN_FAIL
	});
};

const signupSuccess = (dispatch, user) => {
	dispatch({
		type : SIGNUP_SUCCESS,
		payload : user
	});
	Actions.main({ type : 'reset'});
};

const signupFail = (dispatch) => {
	dispatch({
		type : SIGNUP_FAIL
	});
};