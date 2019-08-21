import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Redirect } from "react-router-dom";

export default function Suggestions() {
	const [suggestions, setSuggestions] = useState([]);
	const [errorMsg, setErrorMsg] = useState("");

	const loadPirate = async () => {
		// const token =
		// 	"AhLMZEcgEUppno4KvUumPJOFysYnFby14jTkuKdGFxAjMKCi1gWYQDAAADCgRheeJeYgu8EAAAAA";

		// // const link = `https://api.pinterest.com/v1/pins/196680708713682737/?fields=id,url,creator,note&limit=1&access_token=${token}`;
		// const link = `https://api.pinterest.com/v1/boards/kylerbar310/sundae-party/pins/?access_token=<AhLMZEcgEUppno4KvUumPJOFysYnFby14jTkuKdGFxAjMKCi1gWYQDAAADCgRheeJeYgu8EAAAAA>`;
		// const response = await fetch(link, {
		// 	method: "GET",
		// 	headers: {
		// 		// "Content-Type": "application/json",
		// 		Authorization:
		// 			"Bearer AhLMZEcgEUppno4KvUumPJOFysYnFby14jTkuKdGFxAjMKCi1gWYQDAAADCgRheeJeYgu8EAAAAA",
		// 		// "Access-Control-Allow-Origin": "*", // Required for CORS support to work
		// 		// "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
		// 	},
		// });
		// const responseJSON = await response.json();
		const response = await fetch("https://localhost:5000/pinterest", {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
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
