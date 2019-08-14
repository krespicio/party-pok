import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MiniPartyPlan from "./MiniPartyPlan";
import { Redirect } from "react-router-dom";

export default function Parties() {
	const [parties, setParties] = useState([]);
	const [partySelected, setPartySelected] = useState(false);
	const [partyId, setPartyId] = useState("");

	useEffect(() => {
		fetch("http://localhost:5000/parties/get", {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(response => response.json())
			.then(responseJSON => {
				loadParties(responseJSON.data);
			})
			.catch(e => console.log("There's an error", e));
	}, []);

	const loadParties = response => {
		setParties(response);
	};

	const addNoteToParty = async partyId => {
		const link = "http://localhost:5000/party/" + partyId + "/notes/create";
		const now = new Date();
		const response = await fetch(link, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				content: "content",
				timeAdded: now,
			}),
		});
		const responseJSON = await response.json();
		console.log(responseJSON);
		if (responseJSON.success) {
			console.log("we did it ");
		}
	};

	const getPartyDetails = partyId => {
		setPartyId(partyId);
		setPartySelected(true);
	};

	if (partySelected) {
		return <Redirect to={"/party/" + partyId} />;
	}

	return (
		<div>
			Current Parties
			{/* <ul>{parties && parties.map(party => <li>{party.title}</li>)}</ul> */}
			{parties &&
				parties.map(party => (
					<MiniPartyPlan
						party={party}
						getPartyDetails={partyId => getPartyDetails(partyId)}
						addNoteToParty={partyId => addNoteToParty(partyId)}
					/>
				))}
		</div>
	);
}
