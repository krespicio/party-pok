import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

export default function Notes(props) {
	return <div style={styles.banner}>Notes</div>;
}

const styles = {
	banner: {
		display: "flex",
		justifyContent: "space-between",
	},
};
