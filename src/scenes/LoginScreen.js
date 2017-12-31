import React, { Component } from 'react';
import {
	StyleSheet, 
	Text,
	View,
	AppRegistry,
	Image,
	TextInput,
	TouchableHighlight,
	KeyboardAvoidingView
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import {
	emailChanged,
	passwordChanged,
	signupPage,
	loginUser
} from '../actions';
import { Actions } from 'react-native-router-flux';
import Spinner from '../components/Spinner';
 

class LoginScreen extends Component {

	onChangeTextEmail(text) {
		this.props.emailChanged(text);
	}

	onChangeTextPassword(text) {
		this.props.passwordChanged(text);
	}

	onPressLogin() {
		const { 
			email, 
			password, 
			emailEntered, 
			passwordEntered 
		} = this.props;

		if(emailEntered)
			this.props.loginUser({ email, password });
	}

	renderErrMsg() {
		const { 
			err, 
			emailEntered, 
			passwordEntered 
		} = this.props;

		let error;

		
		if((!emailEntered) && passwordEntered)
			error = "Please enter your mail id";
		else if(err)
			error = err;

		return (
			<View style = {styles.errMsgContainer}>
				<Text style = {styles.errMsg}>{error}</Text>
			</View>
		)
	}

	renderLoginButton() {
		if(this.props.loading) {
			return (
				<Spinner/>
			);
		} else {
			return (
				<TouchableHighlight
					style = {styles.loginButton}
					onPress = {this.onPressLogin.bind(this)}
					>
					<Text style = {styles.loginButtonText}>
						LOGIN
					</Text>
				</TouchableHighlight>
			);
		}
	}

	render() {
		return(
			<KeyboardAwareScrollView style = {styles.container}>
				<View style = {styles.logoContainer}>
					<Image
						style = {styles.logo}
						source = {require('../images/logo.jpg')}
					/>
					<Text style = {styles.title}>Welcome to Namma KanakkuPillai</Text>
				</View>
				<View style = {styles.signupTextContainer}>
					<Text style = {styles.signupText}>Don't have an account yet? </Text>
					<TouchableHighlight onPress = {this.props.signupPage}>
						<Text style = {styles.signupButtonText}>Signup</Text>
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
						returnKeyType = "go"
						onChangeText = {this.onChangeTextPassword.bind(this)}
						value = {this.props.password}
						autoCorrect = {false}
						autoCapitalize = "none"
						ref = {(input) => this.passwordInput = input} 
						secureTextEntry
						/>
					{this.renderErrMsg()}
					{this.renderLoginButton()}
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
	signupTextContainer : {
		flexGrow : 1,
		flexDirection : 'row',
		paddingVertical : 20,
		alignItems : 'flex-end',
		justifyContent : 'center'
	},
	signupText : {
		color : 'white',
		opacity : 0.3,
		fontSize : 15
	},
	signupButtonText : {
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
	loginButton : {
		height : 50,
		justifyContent : 'center',
		backgroundColor : '#3498DB',
		marginVertical : 10
	},
	loginButtonText : {
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
		err,
		loading 
	} = state.authentication;

	const emailEntered = email.length !== 0;
	const passwordEntered = password.length !== 0;

	return {
		email,
		password,
		err,
		loading,
		emailEntered,
		passwordEntered
	};
};

export default connect (mapStateToProps, { 
	emailChanged,
	passwordChanged,
	signupPage,
	loginUser
})(LoginScreen);