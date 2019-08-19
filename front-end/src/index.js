import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Register from "./containers/RegisterPage";
import HomePage from "./containers/HomePage";
import PartyPage from "./containers/PartyPage";
import InfoPage from "./containers/InfoPage";

import reducer from "./reducers/index";
import ProfilePage from "./containers/ProfilePage";
import ContactsPage from "./containers/ContactsPage";
let store = createStore(reducer);

const routing = (
	<Router>
		<Provider store={store}>
			<Route exact path="/" component={HomePage} />
			<Route exact path="/party/:partyId" component={PartyPage} />
			<Route exact path="/info" component={InfoPage} />
			<Route exact path="/contacts" component={ContactsPage} />
			<Route exact path="/profile" component={ProfilePage} />
		</Provider>
		<Route exact path="/testing" component={App} />
		<Route exact path="/register" component={Register} />
	</Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
