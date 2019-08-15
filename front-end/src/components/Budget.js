import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

export default function Budget(props) {
	return <div style={styles.banner}>Budget</div>;
}

const styles = {
	banner: {
		display: "flex",
		justifyContent: "space-between",
	},
};
