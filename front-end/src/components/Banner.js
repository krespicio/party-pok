import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

export default function Banner(props) {
	const [goHome, setGoHome] = useState(false);
	const [goToInfo, setGoToInfo] = useState(false);
	const [goToProfile, setGoToProfile] = useState(false);
	const [goToContacts, setGoToContacts] = useState(false);

	const createParty = () => {
		props.openPartyModal();
	};

	const clickGoHome = () => {
		if (window.location.href !== "http://localhost:3000/") {
			setGoHome(true);
		}
	};

	const clickToInfo = () => {
		if (window.location.href !== "http://localhost:3000/info") {
			setGoToInfo(true);
		}
	};

	const clickToContacts = () => {
		if (window.location.href !== "http://localhost:3000/contacts") {
			setGoToContacts(true);
		}
	};

	const clickToProfile = () => {
		if (window.location.href !== "http://localhost:3000/profile") {
			setGoToProfile(true);
		}
	};

	if (goHome) {
		return <Redirect to="/" />;
	}

	if (goToInfo) {
		return <Redirect to="/info" />;
	}

	if (goToContacts) {
		return <Redirect to="/contacts" />;
	}

	if (goToProfile) {
		return <Redirect to="/profile" />;
	}

	return (
		<div style={styles.banner}>
			<div>
				<button onClick={() => clickGoHome()}>Home</button>
				<button onClick={() => clickToContacts()}>Contacts</button>
				<button>Search</button>
			</div>
			<div onClick={() => clickGoHome()} style={{ cursor: "pointer" }}>
				Party Pok
			</div>
			<div>
				<button onClick={() => createParty()}>Create Party</button>
				<button onClick={() => clickToInfo()}>Info</button>
				<button onClick={() => clickToProfile()}>Profile</button>
			</div>
		</div>
	);
}

const styles = {
	banner: {
		display: "flex",
		justifyContent: "space-between",
	},
};
