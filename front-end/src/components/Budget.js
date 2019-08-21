import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

function Textboy(props) {
	const [name, setName] = useState("");
	const [budgeted, setBudgeted] = useState("");
	const [actual, setActual] = useState("");

	const createExpense = async () => {
		const link = "https://localhost:5000/party/" + props.id + "/expenses/create";
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
			props.reload();
		}
	};

	const deleteExpense = () => {};

	const editExpense = () => {};

	return (
		<div>
			<input
				type="text"
				value={name}
				onChange={e => setName(e.target.value)}
				placeholder="Ex: Bouncy House"
			/>
			<input
				type="number"
				value={budgeted}
				onChange={e => setBudgeted(e.target.value)}
				placeholder="Ex: 100"
			/>
			<input
				type="number"
				value={actual}
				onChange={e => setActual(e.target.value)}
				placeholder="Ex: 100"
			/>
			<button onClick={() => createExpense()}>submit</button>
			<button onClick={() => props.cancelInvite()}>x</button>
			{/* <Modal isOpen={newNumber} contentLabel="Minimal Modal Example">
				<NewContact
					setNewNumber={setNewNumber}
					phone={number}
					sendMessage={sendMessage.bind(this)}
				/>
			</Modal> */}
		</div>
	);
}

export default function Budget(props) {
	const [expenses, setExpenses] = useState([]);

	useEffect(() => {
		reload();
	}, []);

	const reload = () => {
		fetch("https://localhost:5000/party/" + props.id + "/expenses/get", {
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
			<h1>Budget</h1>
			Max: {props.budget} Current: {findActualSpent()}
			<div>
				Reported Expenses:
				<ul>
					{expenses.map(expense => (
						<li>
							{expense.name} - Actual: {expense.actual}, Budgeted: {expense.budgeted}
						</li>
					))}
				</ul>
			</div>
			<Textboy id={props.id} reload={reload} />
		</div>
	);
}

const styles = {
	banner: {
		display: "flex",
		justifyContent: "space-between",
	},
};
