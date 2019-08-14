import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Redirect } from "react-router-dom";

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

	const finishNewNote = () => {
		reloadData();
		setNewNote(false);
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

	const findDaysAway = () => {};

	return (
		<div>
			{props.party.title}
			<ul>
				<li>Days Away: {7}</li>
				<li>
					Current Budget: {50}/{100} ({50}%)
				</li>
				<li>
					Current Notes:{" "}
					<ul>
						{notes.map(note => (
							<li>{note.content}</li>
						))}
					</ul>
				</li>
			</ul>
			{newNote ? (
				<TextBoy
					addNoteToParty={content => props.addNoteToParty(props.party._id, content)}
					finish={() => finishNewNote()}
				/>
			) : (
				<button onClick={() => startNewNote()}>Add Note</button>
			)}
			{/* <button onClick={() => props.addNoteToParty(props.party._id)}>Add Note</button> */}

			<button onClick={() => props.getPartyDetails(props.party._id)}>(i)</button>
		</div>
	);
}
