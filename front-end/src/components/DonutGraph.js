import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Doughnut } from "react-chartjs-2";

import "bootstrap/dist/css/bootstrap.min.css";

export default function DonutGraph(props) {
	let rainbow = [];
	function sin_to_hex(i, phase) {
		var sin = Math.sin((Math.PI / props.expenses.length) * 2 * i + phase);
		var int = Math.floor(sin * 127) + 128;
		var hex = int.toString(16);

		return hex.length === 1 ? "0" + hex : hex;
	}
	for (let i = 0, size = props.expenses.length; i < size; i++) {
		const red = sin_to_hex(i, (0 * Math.PI * 2) / 3); // 0   deg
		const blue = sin_to_hex(i, (1 * Math.PI * 2) / 3); // 120 deg
		const green = sin_to_hex(i, (2 * Math.PI * 2) / 3); // 240 deg

		rainbow.push("#" + red + green + blue);
	}

	if (props.expenses.length === 0) {
		return <div></div>;
	}

	return (
		<div>
			<Doughnut
				style={{ width: "50%", height: "50%", fontSize: "2em" }}
				data={{
					datasets: [
						{
							label: "Actual",
							data: [...props.expenses.map(expense => expense.actual)],
							backgroundColor: [
								...props.expenses.map((expense, i) => rainbow[i]),
								// findExtraColor(),
							],
							// labels: props.expenses.map(expense => expense.name),
						},
					],
					labels: [...props.expenses.map(expense => expense.name)],
				}}
				options={{
					legend: {
						display: false,
					},
				}}
			/>
		</div>
	);
}

const styles = {
	icon: {
		cursor: "pointer",
		fontSize: "2em",
	},
};
