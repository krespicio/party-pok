import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Redirect } from "react-router-dom";

export default function MiniPartyPlan(props) {
	const findDaysAway = () => {};
	console.log(props.party);
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
						{props.party.notes.map(note => (
							<li>{note.content}</li>
						))}
					</ul>
				</li>
			</ul>
			<button onClick={() => props.addNoteToParty(props.party._id)}>Add Note</button>
			<button onClick={() => props.getPartyDetails(props.party._id)}>(i)</button>
		</div>
	);
}
