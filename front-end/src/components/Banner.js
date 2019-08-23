import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHome,
	faSearch,
	faAddressBook,
	faBirthdayCake,
	faQuestionCircle,
	faUser,
} from "@fortawesome/free-solid-svg-icons";

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
		} else {
			window.location.reload();
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
			<div style={styles.left}>
				<FontAwesomeIcon icon={faHome} style={styles.icon} onClick={() => clickGoHome()} />
				<FontAwesomeIcon
					icon={faAddressBook}
					style={styles.icon}
					onClick={() => clickToContacts()}
				/>
				<FontAwesomeIcon icon={faSearch} style={styles.icon} />
			</div>
			<div onClick={() => clickGoHome()} className="partypok">
				Party Pok
			</div>
			<div style={styles.right}>
				<FontAwesomeIcon
					icon={faBirthdayCake}
					style={styles.icon}
					onClick={() => createParty()}
				/>
				<FontAwesomeIcon
					icon={faQuestionCircle}
					style={styles.icon}
					onClick={() => clickToInfo()}
				/>
				<FontAwesomeIcon
					icon={faUser}
					style={styles.icon}
					onClick={() => clickToProfile()}
				/>
			</div>
		</div>
	);
}

const styles = {
	banner: {
		display: "flex",
		justifyContent: "space-between",
		height: "8%",
		backgroundColor: "#216583",
		padding: "5px",
		alignItems: "center",
		marginBottom: "15px",
	},
	left: {
		marginLeft: "5px",
		display: "flex",
		justifyContent: "space-between",
		width: "15%",
	},
	right: {
		marginRight: "5px",
		display: "flex",
		justifyContent: "space-between",
		width: "15%",
	},
	icon: {
		cursor: "pointer",
		fontSize: "2em",
	},
};
