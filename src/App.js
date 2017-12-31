import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import firebase from 'firebase';
import Transactions from './scenes/Transactions';
import NewTransaction from './scenes/NewTransaction';
import Summary from './scenes/Summary';
import Router from './Router';


class App extends Component {

  componentWillMount() {
    
    var firebaseConfig = {
      apiKey: "AIzaSyC5FssutEKnJfa3wUb4H72fF5vVze1lfqE",
      authDomain: "kanakupillainb.firebaseapp.com",
      databaseURL: "https://kanakupillainb.firebaseio.com",
      projectId: "kanakupillainb",
      storageBucket: "kanakupillainb.appspot.com",
      messagingSenderId: "714508329215"
    };
    firebase.initializeApp(firebaseConfig);

  }

 render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;