import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import BarGraph from "./BarGraph";
import DonutGraph from "./DonutGraph";
import ProgressBar from "react-bootstrap/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
// import { AwesomeButton } from "react-awesome-button";
// import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.scss";

import startingLink from "../link";
import "bootstrap/dist/css/bootstrap.min.css";

function Textboy(props) {
	const [name, setName] = useState("");
	const [budgeted, setBudgeted] = useState("");
	const [actual, setActual] = useState("");

	const createExpense = async () => {
		const link = startingLink + "/party/" + props.id + "/expenses/create";
		const response = await fetch(link, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				budgeted,
				name,
				actual,
			}),
		});
		const responseJSON = await response.json();
		if (responseJSON.success) {
			props.close();
			props.reload();
		}
	};

	const deleteExpense = () => {};

	const editExpense = () => {};

	return (
		<div style={styles.input}>
			<strong>Name of Expense</strong>
			<input
				type="text"
				value={name}
				onChange={e => setName(e.target.value)}
				placeholder="Ex: Bouncy House"
			/>
			<strong>Budgeted Amount</strong>
			<input
				type="number"
				value={budgeted}
				onChange={e => setBudgeted(e.target.value)}
				placeholder="Ex: 100"
			/>
			<strong>Actual Amount</strong>
			<input
				type="number"
				value={actual}
				onChange={e => setActual(e.target.value)}
				placeholder="Ex: 100"
			/>
			<div style={styles.send}>
				<button onClick={() => createExpense()}>
					Add Expense
					<FontAwesomeIcon style={styles.icon} icon={faPaperPlane} />
				</button>
				<FontAwesomeIcon
					onClick={() => props.close()}
					style={{ ...styles.icon, marginTop: "2px", fontSize: "1.4em" }}
					icon={faTimes}
				/>
			</div>
		</div>
	);
}

export default function Budget(props) {
	const [expenses, setExpenses] = useState([]);
	const [openGraphs, setOpenGraphs] = useState(false);
	const [openText, setOpenText] = useState(false);

	useEffect(() => {
		reload();
	}, []);

	const reload = () => {
		fetch(startingLink + "/party/" + props.id + "/expenses/get", {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(response => response.json())
			.then(responseJSON => {
				setExpenses(responseJSON.data);
			});
	};

	const findActualSpent = () => {
		return expenses.reduce((acc, expense) => {
			return acc + expense.actual;
		}, 0);
	};

	return (
		<div>
			<h2>Budget: {props.budget}</h2>
			<DonutGraph close={() => setOpenGraphs(false)} expenses={expenses} />
			<ProgressBar
				style={{ marginTop: "20px" }}
				now={(findActualSpent() / props.budget) * 100}
				variant={
					(findActualSpent() / props.budget) * 100 < 80
						? "info"
						: (findActualSpent() / props.budget) * 100 < 100
						? "warning"
						: "danger"
				}
				label={`Spent $${findActualSpent()} out of Budgeted $${props.budget}`}
			/>

			<div>
				Reported Expenses:
				<ul>
					{expenses.length === 0 && <li>None... Add Something!</li>}
					{expenses.map(expense => (
						<li>
							{expense.name} - Actual: {expense.actual}, Budgeted: {expense.budgeted}
						</li>
					))}
				</ul>
			</div>
			<button onClick={() => setOpenGraphs(true)} className="button-on-right">
				See Expense Distribution
			</button>
			{openText ? (
				<Textboy id={props.id} reload={reload} close={() => setOpenText(false)} />
			) : (
				<button onClick={() => setOpenText(true)}>Add Expense</button>
			)}
			<Modal isOpen={openGraphs} contentLabel="Minimal Modal Example">
				<BarGraph
					close={() => setOpenGraphs(false)}
					expenses={expenses}
					budget={props.budget}
				/>
			</Modal>
		</div>
	);
}

const styles = {
	input: {
		display: "flex",
		flexDirection: "column",
		marginTop: "20px",
		// minHeight: "180px",
	},
	send: {
		marginTop: "10px",
		display: "flex",
		justifyContent: "flex-end",
		// marginBorder:
	},
	icon: {
		cursor: "pointer",
		marginLeft: "8px",
	},
};
