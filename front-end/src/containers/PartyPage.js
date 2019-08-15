import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Redirect } from "react-router-dom";
import Modal from "react-modal";
import { connect } from "react-redux";
import { openPartyModal, closePartyModal } from "../actions/index";

import Banner from "../components/Banner";
import Notifications from "../components/Notifications";
import Suggestions from "../components/Suggestions";
import Parties from "../components/Parties";
import PartyForm from "../components/PartyForm";

Modal.setAppElement("#root");

let PartyPage = props => {
	const [party, setParty] = useState(null);

	useEffect(() => {
		// const link = "http://localhost:5000/party/" + props.match.params.partyId + "/get";
		// console.log(link);
		fetch("http://localhost:5000/party/" + props.match.params.partyId + "/get", {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(response => response.json())
			.then(responseJSON => {
				console.log(responseJSON.data.notes);
				setParty(responseJSON.data);
			});
	}, []);

	return (
		<div>
			<Banner openPartyModal={() => props.openPartyModal()} modalIsOpen={props.modalIsOpen} />
			<Modal isOpen={props.modalIsOpen} contentLabel="Minimal Modal Example">
				<PartyForm closePartyModal={() => props.closePartyModal()} />
			</Modal>
			<div style={{ display: "flex", justifyContent: "space-around" }}>
				{party && (
					<div>
						<h1>{party.title}</h1>
						<div>
							{party.notes.map(note => (
								<h2>{note.content}</h2>
							))}
						</div>
					</div>
				)}
			</div>
			<button>edit</button>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		modalIsOpen: state.modalIsOpen,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		openPartyModal: () => {
			dispatch(openPartyModal());
		},
		closePartyModal: () => {
			dispatch(closePartyModal());
		},
	};
};

PartyPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(PartyPage);

export default PartyPage;
