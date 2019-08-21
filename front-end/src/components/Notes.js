import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";

export default function Notes(props) {
	return (
		<div style={styles.banner}>
			<h1>Notes</h1>
			{props.notes.map(note => (
				<div style={styles.note}>
					<h4>
						{note.content + " "}
						<span style={styles.date}>{new Date(note.timeAdded).toDateString()}</span>
					</h4>
					<FontAwesomeIcon style={styles.icon} icon={faTimes} />
				</div>
			))}
			<button>Add Note</button>
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
	icon: {
		marginLeft: "8px",
		marginTop: "10px",
	},
	note: {
		display: "flex",
	},
};
