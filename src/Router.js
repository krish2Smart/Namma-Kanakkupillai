import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginScreen from './scenes/LoginScreen';
import SignupScreen from './scenes/SignupScreen';
import Transactions from './scenes/Transactions';
import NewTransaction from './scenes/NewTransaction';
import Summary from './scenes/Summary';


const RouterComponent = () => {
	return (
		<Router hideNavBar={true}>
			<Scene key = "authentication">
	        	<Scene key = "login" component = { LoginScreen }  initial/>
	        	<Scene key = "signup" component = { SignupScreen } />
	        </Scene>
	        <Scene key = "main">
	      		<Scene key = "transactions" component = { Transactions } initial/>
	      		<Scene key = "newTransaction" component = { NewTransaction }/>
	      		<Scene key = "summary" component = { Summary }/>
	      	</Scene>
	    </Router>
	);
};

export default RouterComponent;