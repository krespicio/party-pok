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

	const deleteParty = () => {};

	const addNoteToParty = () => {};

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
					/>
				))}
		</div>
	);
}
