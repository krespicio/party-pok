import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MiniPartyPlan from "./MiniPartyPlan";
import { Redirect } from "react-router-dom";

export default function Parties() {
	const [parties, setParties] = useState([]);
	const [partySelected, setPartySelected] = useState(false);
	const [partyId, setPartyId] = useState("");

	useEffect(async () => {
		const response = await fetch("http://localhost:5000/parties/get", {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const responseJSON = await response.json();
		console.log("this is the response jsons", responseJSON);
		loadParties(responseJSON.data);
	}, []);

	const loadParties = response => {
		console.log(response);
		setParties(response);
	};

	const deleteParty = () => {};

	const addNoteToParty = () => {};

	const getPartyDetails = partyId => {
		console.log(partyId);
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
					/>
				))}
		</div>
	);
}
