import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faInfoCircle, faInfo } from "@fortawesome/free-solid-svg-icons";

function TextBoy(props) {
	const [content, setContent] = useState("");

	const addAndFinishNote = async () => {
		await props.addNoteToParty(content);
		props.finish();
	};

	return (
		<div>
			<input type="text" value={content} onChange={e => setContent(e.target.value)} />
			<button onClick={() => addAndFinishNote()}>submit</button>
		</div>
	);
}

export default function MiniPartyPlan(props) {
	const [newNote, setNewNote] = useState(false);
	const [notes, setNotes] = useState(props.party.notes);

	const startNewNote = () => {
		setNewNote(true);
	};

	const reloadData = () => {
		fetch("http://localhost:5000/party/" + props.party._id + "/notes/get", {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(response => response.json())
			.then(responseJSON => {
				console.log("this is the reposne data", responseJSON.data);
				setNotes(responseJSON.data);
			});
	};

	const finishNewNote = () => {
		reloadData();
		setNewNote(false);
	};

	const finishDeleting = async (partyId, noteId) => {
		await props.deletePartyNote(partyId, noteId);
		reloadData();
	};

	const findDaysAway = datetime => {
		// console.log(dattime, typeof datetime);
		datetime = typeof datetime !== "undefined" ? datetime : "2014-01-01 01:02:03.123456";

		datetime = new Date(datetime).getTime();
		let now = new Date().getTime();

		let milisec_diff;
		if (datetime > now) {
			milisec_diff = datetime - now;
		} else {
			return "The party already happened silly, billy";
		}

		const days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));

		return days;
	};

	return (
		<div>
			{props.party.title}
			<ul>
				<li>Days Away: {findDaysAway(props.party.time)}</li>
				<li>
					Current Budget: {50}/{props.party.budget} (
					{Math.floor((50 / props.party.budget) * 100)}%)
				</li>
				<li>
					Current Notes:{" "}
					<ul>
						{notes.map(note => (
							<li>
								{note.content}
								<FontAwesomeIcon
									onClick={() => finishDeleting(props.party._id, note._id)}
									style={styles.icon}
									icon={faTimes}
								/>
							</li>
						))}
					</ul>
				</li>
			</ul>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				{newNote ? (
					<TextBoy
						addNoteToParty={content => props.addNoteToParty(props.party._id, content)}
						finish={() => finishNewNote()}
					/>
				) : (
					<button onClick={() => startNewNote()}>Add Note</button>
				)}

				<FontAwesomeIcon
					onClick={() => props.getPartyDetails(props.party._id)}
					style={{ ...styles.icon, marginTop: "10px" }}
					icon={faInfoCircle}
				/>
			</div>
		</div>
	);
}

const styles = {
	icon: {
		cursor: "pointer",
		marginLeft: "5px",
		marginRight: "5px",
	},
};
