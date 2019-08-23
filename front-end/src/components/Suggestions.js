import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Redirect } from "react-router-dom";

export default function Suggestions() {
	const [suggestions, setSuggestions] = useState([]);
	const [errorMsg, setErrorMsg] = useState("");
	const [search, setSearch] = useState("");

	const loadPirate = async () => {
		const response = await fetch("https://localhost:5000/pinterest", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				search,
			}),
		});
		const responseJSON = await response.json();
		console.log(responseJSON);
		if (responseJSON.success) {
			setSuggestions(responseJSON.data);
		} else {
			setErrorMsg("The API has been called too much and Pinterest is about to throw hands");
		}
	};

	return (
		<div style={styles.card}>
			Suggestions
			<input type="text" value={search} onChange={e => setSearch(e.target.value)} />
			<h1>{errorMsg}</h1>
			{suggestions && (
				<div>
					{suggestions.map(suggestion => (
						<div>
							<h1>{suggestion.id}</h1>
							<h2>
								<a href={suggestion.link}>{suggestion.link}</a>
							</h2>
							<h3>{suggestion.note}</h3>
						</div>
					))}
				</div>
			)}
			<button onClick={() => loadPirate()}>get it</button>
		</div>
	);
}

const styles = {
	card: {
		backgroundColor: "#cffdf8 ",
		padding: "5px",
		borderRadius: "5px",
		margin: "5px",
		maxWidth: "49%",
		minWidth: "49%",
	},
};
