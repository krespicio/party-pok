import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

export default function PartyForm(props) {
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [time, setTime] = useState("");
	const [location, setLocation] = useState("");
	const [budget, setBudget] = useState(0);
	const [success, setSuccess] = useState(false);

	const submitPartyInfo = async () => {
		const response = await fetch("https://localhost:5000/party/create", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title,
				description: desc,
				time,
				location,
				budget,
			}),
		});
		const responseJSON = await response.json();
		console.log(responseJSON);
		if (responseJSON.success) {
			setSuccess(true);
		}
	};

	if (success) {
		return (
			<div>
				<button
					onClick={() => {
						setSuccess(false);
						props.closePartyModal();
					}}>
					Close Modal
				</button>
				Congrats on making a party! It's going to be great! Picture a dog
			</div>
		);
	}

	return (
		<div>
			<div style={styles.spaced}>
				<h1>Start a New Party</h1>
				<button onClick={() => props.closePartyModal()}>Close Modal</button>
			</div>

			<legend for="title">Name the Party</legend>
			<input
				type="text"
				className="form-control"
				name="title"
				placeholder="Party Party"
				value={title}
				onChange={e => setTitle(e.target.value)}
			/>
			<legend for="time">When is the Party?</legend>
			{/* <input
				type="text"
				className="form-control"
				name="time"
				placeholder="It's always party time, baby"
				value={time}
				onChange={e => setTime(e.target.value)}
			/> */}
			<input
				type="datetime-local"
				className="form-control"
				name="time"
				value={time}
				onChange={e => setTime(e.target.value)}
			/>
			<legend for="location">Where is the Party?</legend>
			<input
				type="text"
				className="form-control"
				name="location"
				placeholder="Party City, of course"
				value={location}
				onChange={e => setLocation(e.target.value)}
			/>
			<legend for="description">Enter a Short Description</legend>
			<input
				type="text"
				className="form-control"
				name="description"
				placeholder="This is going to be the best party of the year"
				value={desc}
				onChange={e => setDesc(e.target.value)}
			/>
			<legend for="budget">Enter your Budget</legend>
			<input
				type="text"
				className="form-control"
				name="budget"
				placeholder="There's no cost to happiness"
				value={budget}
				onChange={e => setBudget(e.target.value)}
			/>
			<br />
			<button className="register-submit-btn" onClick={() => submitPartyInfo()}>
				Submit
			</button>
		</div>
	);
}

const styles = {
	spaced: {
		display: "flex",
		justifyContent: "space-between",
	},
};
