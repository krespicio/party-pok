import React, { useState, useEffect } from "react";
import startingLink from "../link";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Redirect } from "react-router-dom";
import Modal from "react-modal";
import { connect } from "react-redux";
import { openPartyModal, closePartyModal } from "../actions/index";

import Banner from "../components/Banner";
import PartyForm from "../components/PartyForm";
import Budget from "../components/Budget";
import GuestManager from "../components/GuestManager";
import Notes from "../components/Notes";

Modal.setAppElement("#root");

let PartyPage = props => {
	const [party, setParty] = useState(null);

	useEffect(() => {
		reload();
	}, []);

	const reload = () => {
		fetch(startingLink + "/party/" + props.match.params.partyId + "/get", {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(response => response.json())
			.then(responseJSON => {
				setParty(responseJSON.data);
			});
	};

	return (
		<div>
			<Banner openPartyModal={() => props.openPartyModal()} modalIsOpen={props.modalIsOpen} />
			<Modal
				isOpen={props.modalIsOpen}
				contentLabel="Minimal Modal Example"
				className="modaling">
				<PartyForm closePartyModal={() => props.closePartyModal()} />
			</Modal>
			{party && (
				<div className="new-font">
					<h1 className="party-title">{party.title}</h1>

					<div style={{ display: "flex", justifyContent: "space-around" }}>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								// justifyContent: "flex-end",
								minHeight: "80%",
							}}>
							<GuestManager
								time={party.time}
								location={party.location}
								id={party._id}
								guestId={party.guests}
							/>
							<Notes notes={party.notes} id={party._id} reload={() => reload()} />
						</div>
						<Budget id={party._id} budget={party.budget} expenses={party.expenses} />
					</div>
				</div>
			)}
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
