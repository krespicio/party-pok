import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Modal from "react-modal";

import "bootstrap/dist/css/bootstrap.min.css";
import NewContact from "./NewContact";

Modal.setAppElement("#root");

function TextBoy(props) {
	const [number, setNumber] = useState("");
	const [newNumber, setNewNumber] = useState(false);

	const text = async () => {
		// Check if the contact exists first
		if (await checkForContact(number)) {
			console.log("its there");
			// sendMessage();
		} else {
			// If contact does not exist, start a new form
			setNewNumber(true);
		}
	};

	const sendMessage = async () => {
		const numberString = "+1" + number;
		const response = await fetch("http://localhost:5000/invitation/text/send", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				to: numberString,
				time: new Date(props.time).toDateString(),
				location: props.location,
			}),
		});
		const responseJSON = await response.json();
		if (responseJSON.success) {
			props.cancelInvite();
		}
	};

	const checkForContact = async phone => {
		const response = await fetch("http://localhost:5000/contact/check", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				phone: number,
			}),
		});
		const responseJSON = await response.json();
		console.log("this is the json", responseJSON);
		return responseJSON.success;
	};

	return (
		<div>
			<input
				type="text"
				value={number}
				onChange={e => setNumber(e.target.value)}
				placeholder="Ex: 7753426969"
			/>
			<button onClick={() => text()}>submit</button>
			<button onClick={() => props.cancelInvite()}>x</button>
			<Modal isOpen={newNumber} contentLabel="Minimal Modal Example">
				<NewContact
					setNewNumber={setNewNumber}
					phone={number}
					sendMessage={sendMessage.bind(this)}
				/>
			</Modal>
		</div>
	);
}

export default function GuestManager(props) {
	const [inviteGuest, setInviteGuest] = useState(false);

	return (
		<div style={styles.banner}>
			<h1>GuestManager</h1>
			<h1>Confirmed</h1>
			<h1>Pending</h1>
			<h1>Busy</h1>

			{inviteGuest ? (
				<TextBoy
					cancelInvite={() => setInviteGuest(false)}
					time={props.time}
					location={props.location}
				/>
			) : (
				<button onClick={() => setInviteGuest(true)}>Send Invitation</button>
			)}
		</div>
	);
}

const styles = {
	banner: {
		display: "block",
	},
};
