import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

export default function Notes(props) {
	return (
		<div style={styles.banner}>
			<h1>Notes</h1>
			{props.notes.map(note => (
				<div>
					<h4>
						{note.content + " "}
						<span style={styles.date}>{new Date(note.timeAdded).toDateString()}</span>
					</h4>
				</div>
			))}
		</div>
	);
}

const styles = {
	banner: {
		// display: "flex",
		// justifyContent: "space-between",
	},
	date: {
		fontSize: "0.6em",
	},
};
