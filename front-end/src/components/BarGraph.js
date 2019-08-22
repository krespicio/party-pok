import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Bar } from "react-chartjs-2";

import "bootstrap/dist/css/bootstrap.min.css";

export default function Graphs(props) {
	const findExtra = () => {
		return props.expenses.reduce(
			(acc, expense) => acc + (expense.budgeted - expense.actual),
			0
		);
	};

	const findExtraColor = () => {
		return findExtra() > 0 ? "gold" : "#f76262";
	};

	if (props.expenses.length === 0) {
		return (
			<div>
				<div style={{ display: "flex", justifyContent: "flex-end" }}>
					<FontAwesomeIcon
						icon={faTimes}
						style={styles.icon}
						onClick={() => props.close()}
					/>
				</div>
				<h1>You haven't entered any expenses yet!</h1>
			</div>
		);
	}

	return (
		<div>
			<div style={{ display: "flex", justifyContent: "flex-end" }}>
				<FontAwesomeIcon icon={faTimes} style={styles.icon} onClick={() => props.close()} />
			</div>
			<Bar
				// style={{ width: "50%", height: "80%", fontSize: "2em" }}
				width={100}
				height={500}
				data={{
					datasets: [
						{
							label: "Actual",
							data: [...props.expenses.map(expense => expense.actual), findExtra()],
							backgroundColor: [
								...props.expenses.map(expense => "#65c0ba"),
								findExtraColor(),
							],
							// labels: props.expenses.map(expense => expense.name),
						},
						{
							label: "Budgeted",
							data: [...props.expenses.map(expense => expense.budgeted), 0],
							backgroundColor: [
								...props.expenses.map(expense => "#216583"),
								"#216583",
							],
							// labels: props.expenses.map(expense => expense.name + " yeet"),
						},
					],
					labels: [...props.expenses.map(expense => expense.name), "Cash Margin"],
				}}
				options={{
					legend: {
						labelString: "Currency Units",
						display: true,
						labels: {
							generateLabels: function(chart) {
								// const data = chart.data;
								// const labels = data.labels;
								return chart.data.datasets.map((dataset, i) => {
									return {
										text: dataset.label,
										fillStyle: dataset.backgroundColor[0],
									};
								});
								// return [{ text: "yeet" }, { text: "yeet" }];
							},
						},
					},
					maintainAspectRatio: false,
					scales: {
						yAxes: [
							{
								scaleLabel: {
									display: true,
									labelString: "Currency Units",
								},
							},
						],
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
