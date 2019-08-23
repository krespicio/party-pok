import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import startingLink from "../link";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NewContact(props) {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	// const [success, setSuccess] = useState(false);

	const createNewContact = async () => {
		const response = await fetch(startingLink + "/contact/create", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				firstName,
				lastName,
				phone: props.phone,
			}),
		});
		const responseJSON = await response.json();
		if (responseJSON.success) {
			props.sendMessage();
			props.setNewNumber(false);
		}
	};

	return (
		<div>
			<div style={styles.banner}>
				Create a New Contact
				<button onClick={() => props.setNewNumber(false)}>close</button>
			</div>
			<legend for="title">First Name</legend>
			<input
				type="text"
				className="form-control"
				name="title"
				placeholder="John"
				value={firstName}
				onChange={e => setFirstName(e.target.value)}
			/>
			<legend for="time">Last Name</legend>
			<input
				type="text"
				className="form-control"
				name="time"
				placeholder="Smith"
				value={lastName}
				onChange={e => setLastName(e.target.value)}
			/>
			<br />
			<button className="register-submit-btn" onClick={() => createNewContact()}>
				Submit
			</button>
		</div>
	);
}

const styles = {
	banner: {
		display: "flex",
		justifyContent: "space-between",
	},
};
