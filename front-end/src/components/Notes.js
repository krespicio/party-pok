import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";

function TextBoy(props) {
	const [content, setContent] = useState("");

	return (
		<div>
			<input type="text" value={content} onChange={e => setContent(e.target.value)} />
			<button onClick={() => props.addNote(content)}>submit</button>
			<button onClick={() => props.setAdd(false)}>x</button>
		</div>
	);
}

export default function Notes(props) {
	const [add, setAdd] = useState(false);

	const addNote = async (partyId, content) => {
		const link = "https://localhost:5000/party/" + partyId + "/notes/create";
		const now = new Date();
		const response = await fetch(link, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				content,
				timeAdded: now,
			}),
		});
		const responseJSON = await response.json();
		if (responseJSON.success) {
			setAdd(false);
			props.reload();
		}
	};

	return (
		<div style={styles.banner}>
			<h1>Notes</h1>
			{props.notes.map(note => (
				<div style={styles.note}>
					<h4>
						{note.content + " "}
						<span style={styles.date}>{new Date(note.timeAdded).toDateString()}</span>
					</h4>
					<FontAwesomeIcon style={styles.icon} icon={faTimes} />
				</div>
			))}
			{add ? (
				<TextBoy setAdd={setAdd} addNote={content => addNote(props.id, content)} />
			) : (
				<button onClick={() => setAdd(true)}>Add Note</button>
			)}
		</div>
	);
}

const styles = {
	banner: {
		// display: "flex",
		// justifyContent: "space-between",
	},
	date: {
		fontSize: "0.6em",
	},
	icon: {
		marginLeft: "8px",
		marginTop: "10px",
	},
	note: {
		display: "flex",
	},
};
