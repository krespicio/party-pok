import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

function TextBoy(props) {
	const [number, setNumber] = useState("");
	const sext = async () => {
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
		const link = "";
		const response = await fetch(link, {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-type": "application/json",
			},
		});
		const responseJSON = await response.json();
		if (responseJSON.success) {
		} else {
		}
	};

	return (
		<div>
			<input
				type="text"
				value={number}
				onChange={e => setNumber(e.target.value)}
				placeholder="Ex: 7753426969"
			/>
			<button onClick={() => sext()}>submit</button>
			<button onClick={() => props.cancelInvite()}>x</button>
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
