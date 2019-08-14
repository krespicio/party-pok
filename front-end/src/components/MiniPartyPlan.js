import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Redirect } from "react-router-dom";

export default function MiniPartyPlan(props) {
	const findDaysAway = () => {};

	return (
		<div>
			{props.party.title}
			<ul>
				<li>Days Away: {7}</li>
				<li>
					Current Budget: {50}/{100} ({50}%)
				</li>
				<li>Current Notes: none</li>
			</ul>
			<button>Add Note</button>
			<button onClick={() => props.getPartyDetails(props.party._id)}>(i)</button>
		</div>
	);
}
