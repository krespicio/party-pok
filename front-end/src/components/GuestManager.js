import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Modal from "react-modal";

import "bootstrap/dist/css/bootstrap.min.css";
import NewContact from "./NewContact";
import { PromiseProvider } from "mongoose";

Modal.setAppElement("#root");

function TextBoy(props) {
	const [number, setNumber] = useState("");
	const [newNumber, setNewNumber] = useState(false);

	const text = async () => {
		// Check if the contact exists first
		if (await checkForContact(number)) {
			// console.log("its there");
			sendMessage();
		} else {
			// If contact does not exist, start a new form
			setNewNumber(true);
		}
	};

	const sendMessage = async () => {
		const numberString = "+1" + number;
		const response = await fetch("https://localhost:5000/invitation/text/send", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				to: numberString,
				time: new Date(props.time).toDateString(),
				location: props.location,
				id: props.id,
			}),
		});
		const responseJSON = await response.json();
		if (responseJSON.success) {
			props.cancelInvite();
		}
	};

	const checkForContact = async phone => {
		const response = await fetch("https://localhost:5000/contact/check", {
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
	const [guests, setGuests] = useState([]);

	useEffect(() => {
		fetch("https://localhost:5000/guests/" + props.id + "/get", {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(response => response.json())
			.then(responseJSON => {
				setGuests(responseJSON.data);
			});
	}, []);

	return (
		<div style={styles.banner}>
			<h2>GuestManager</h2>
			{guests.length === 0 ? (
				<h2>You haven't invited anyone, silly!</h2>
			) : (
				<div>
					<h3>Confirmed</h3>
					<ul>
						{guests
							.filter(guest => guest.status === "Going")
							.map(acceptedGuest => (
								<li>
									{acceptedGuest.contact.firstName}{" "}
									{acceptedGuest.contact.lastName}
								</li>
							))}
					</ul>

					<h3>Pending</h3>
					<ul>
						{guests
							.filter(guest => guest.status === "Undecided")
							.map(pendingGuest => (
								<li>
									{pendingGuest.contact.firstName} {pendingGuest.contact.lastName}
								</li>
							))}
					</ul>
					<h3>Busy</h3>
					<ul>
						{guests
							.filter(guest => guest.status === "Unable")
							.map(declinedGuest => (
								<li>
									{declinedGuest.contact.firstName}{" "}
									{declinedGuest.contact.lastName}
								</li>
							))}
					</ul>
				</div>
			)}
			{inviteGuest ? (
				<TextBoy
					cancelInvite={() => setInviteGuest(false)}
					time={props.time}
					location={props.location}
					id={props.id}
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
