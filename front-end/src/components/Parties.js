import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Redirect } from "react-router-dom";

export default function Parties() {
	const loadParties = async () => {
		const response = await fetch("http://localhost:5000/party/get", {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const responseJSON = response.json();
	};

	return <div>Current Parties</div>;
}
