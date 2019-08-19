import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

export default function Budget(props) {
	return (
		<div style={styles.banner}>
			<h1>Budget</h1>
			Max: {props.budget} Current: Reported Expenses:
		</div>
	);
}

const styles = {
	banner: {
		display: "flex",
		justifyContent: "space-between",
	},
};
