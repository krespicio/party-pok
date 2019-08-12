import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Register from './containers/RegisterPage'
import HomePage from './containers/HomePage'

const routing = (
	<Router>
		<Route exact path="/" component={HomePage} />
        <Route exact path='/testing' component={App}/>
		<Route exact path="/register" component={Register} />
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
