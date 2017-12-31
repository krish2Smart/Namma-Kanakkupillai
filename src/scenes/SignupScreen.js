import React, { Component } from 'react';
import { 
	AppRegistry,
	View,
	Text,
	StyleSheet,
	TextInput,
	Image,
	TouchableHighlight
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import {
	emailChanged,
	passwordChanged,
	confirmPasswordChanged,
	loginPage,
	signupUser
} from '../actions';
import Spinner from '../components/Spinner';

class SignupScreen extends Component {
	
	onChangeTextEmail(text) {
		this.props.emailChanged(text);
	}

	onChangeTextPassword(text) {
		this.props.passwordChanged(text);
	}

	onChangeTextConfirmPassword(text) {
		this.props.confirmPasswordChanged(text);
	}

	onPressSignup() {
		const {
			email,
			password,
			confirmPassword,
			emailEntered,
			healthyPassword,
			passwordMatched 
		} = this.props;

		if(passwordMatched && healthyPassword && emailEntered)
			this.props.signupUser({ email, password, confirmPassword });
	}

	renderErrMsg() {
		const {
			err,
			emailEntered,
			passwordEntered,
			confirmPasswordEntered,
			healthyPassword,
			passwordMatched
		} = this.props;

		let error;

		
		if((!emailEntered) && (passwordEntered || confirmPasswordEntered))
			error = "Please enter your mail id";
		else if((!passwordEntered) && confirmPasswordEntered)
			error = "Please enter your password";
		else if((!healthyPassword) && passwordEntered)
			error = "Password should contain atleast 6 characters";
		else if((!passwordMatched) && passwordEntered && confirmPasswordEntered)
			error = "Password does not match";
		else if(err)
			error = err;

		return (
			<View style = {styles.errMsgContainer}>
				<Text style = {styles.errMsg}>{error}</Text>
			</View>
		)
	}

	renderSignupButton() {
		if(this.props.loading) {
			return (
				<Spinner/>
			);
		} else {
			return (
				<TouchableHighlight
					style = {styles.signupButton}
					onPress = {this.onPressSignup.bind(this)}
					>
					<Text style = {styles.signupButtonText}>
						SIGNUP
					</Text>
				</TouchableHighlight>
			);
		}
	}

	render() {

		return (
			<KeyboardAwareScrollView style = {styles.container}>
				<View style = {styles.logoContainer}>
					<Image
						style = {styles.logo}
						source = {require('../images/logo.jpg')}
						/>
					<Text style = {styles.title}>Welcome to Namma KanakkuPillai</Text>
				</View>
				<View style = {styles.loginTextContainer}>
					<Text style = {styles.loginText}>Already have an account? </Text>
					<TouchableHighlight onPress = {this.props.loginPage}>
						<Text style = {styles.loginButtonText}>Login</Text>
					</TouchableHighlight>
				</View>
				<View style = {styles.form}>
					<TextInput
						style = {styles.formText}
						placeholder = "Email"
						placeholderTextColor = "#22313F" 
						underlineColorAndroid = "transparent"
						keyboardType = "email-address"
						returnKeyType = "next"
						onChangeText = {this.onChangeTextEmail.bind(this)}
						onSubmitEditing = {() => this.passwordInput.focus()}
						value = {this.props.email}
						autoCorrect = {false}
						autoCapitalize = "none"
						/>
					<TextInput
						style = {styles.formText}
						placeholder = "Password"
						placeholderTextColor = "#22313F"
						underlineColorAndroid = "transparent"
						keyboardType = "default"
						returnKeyType = "next"
						onChangeText = {this.onChangeTextPassword.bind(this)}
						value = {this.props.password}
						autoCorrect = {false}
						autoCapitalize = "none"
						onSubmitEditing = {() => this.confirmPasswordInput.focus()}
						ref = {(input) => this.passwordInput = input}
						secureTextEntry
						/>
					<TextInput
						style = {styles.formText}
						placeholder = "Confirm Password"
						placeholderTextColor = "#22313F"
						underlineColorAndroid = "transparent"
						keyboardType = "default"
						returnKeyType = "go"
						onChangeText = {this.onChangeTextConfirmPassword.bind(this)}
						value = {this.props.confirmPassword}
						autoCorrect = {false}
						autoCapitalize = "none"
						ref = {(input) => this.confirmPasswordInput = input}
						secureTextEntry
						/>
					{this.renderErrMsg()}
					{this.renderSignupButton()}
				</View>
			</KeyboardAwareScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container : {
		flex : 1,
		backgroundColor : 'black'
	},
	logoContainer : {
		alignItems : 'center',
		flexGrow : 1,
		justifyContent : 'center'
	},
	logo : {
		width : 100,
		height : 100
	},
	title : {
		color : 'white',
		margin : 10,
		textAlign : 'center',
		fontSize : 15,
		width : 280
	},
	loginTextContainer : {
		flexGrow : 1,
		flexDirection : 'row',
		paddingVertical : 20,
		alignItems : 'flex-end',
		justifyContent : 'center'
	},
	loginText : {
		color : 'white',
		opacity : 0.3,
		fontSize : 15
	},
	loginButtonText : {
		color : 'white',
		fontSize : 15
	},
	form : {
		padding : 20
	},
	formText : {
		height : 50,
		backgroundColor : '#E4F1FE',
		marginBottom : 20,
		paddingHorizontal : 15,
		fontSize : 20
	},
	signupButton : {
		height : 50,
		justifyContent : 'center',
		backgroundColor : '#3498DB',
		marginVertical : 10
	},
	signupButtonText : {
		textAlign : 'center',
		color : 'white',
		fontSize : 30
	},
	errMsg : {
		textAlign : 'center',
		color : 'red'
	}	
});

const mapStateToProps = state => {
	const { 
		email, 
		password, 
		confirmPassword, 
		err, 
		loading 
	} = state.authentication;

	const emailEntered = email.length !== 0;
	const passwordEntered = password.length !== 0;
	const confirmPasswordEntered = confirmPassword.length !== 0;
	const healthyPassword = password.length > 5;
	const passwordMatched = password === confirmPassword;

	return {
		email,
		password,
		confirmPassword,
		err,
		loading,
		emailEntered,
		passwordEntered,
		confirmPasswordEntered,
		healthyPassword,
		passwordMatched
	};
};

export default connect (mapStateToProps, { 
	emailChanged, 
	passwordChanged, 
	confirmPasswordChanged, 
	loginPage, 
	signupUser 
})(SignupScreen);