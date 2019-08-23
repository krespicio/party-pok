import React, { useState } from "react";
import startingLink from "../link";
import "bootstrap/dist/css/bootstrap.min.css";

// import { Redirect } from "react-router-dom";

export default function Suggestions() {
	const [suggestions, setSuggestions] = useState([]);
	const [errorMsg, setErrorMsg] = useState("");
	const [search, setSearch] = useState("");
	const [img, setImg] = useState(null);

	const loadPins = async () => {
		const response = await fetch(startingLink + "/pinterest", {
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
			if (search.split(" ")[0].toLowerCase() === "sundae") {
				testing();
			}
		} else {
			setErrorMsg("The API has been called too much and Pinterest is about to throw hands");
		}
	};

	const testing = () => {
		fetch(startingLink + "/yeet", {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(x => x.json())
			.then(x => {
				console.log(x);
				setImg(x.data);
			});
	};

	return (
		<div style={styles.card}>
			Suggestions
			{img && (
				<div>
					<h1>{img.title}</h1>
					<img src={img.src} style={{ width: "80%" }} />
				</div>
			)}
			{suggestions && (
				<div>
					{suggestions.map(suggestion => (
						<div>
							<strong>
								<a href={suggestion.link} style={{ display: "block" }}>
									{suggestion.id}
								</a>
							</strong>
							{suggestion.note}
						</div>
					))}
				</div>
			)}
			<input type="text" value={search} onChange={e => setSearch(e.target.value)} />
			<button onClick={() => loadPins()}>Search</button>
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
		display: "block",
	},
};
