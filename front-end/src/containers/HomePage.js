import React, { useState } from "react";
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

let HomePage = props => {
	const getUser = async () => {
		const user = await fetch("http://localhost:5000/user", {
			method: "GET",
			credentials: "include",
			redirect: "follow",
			headers: {
				"Content-Type": "application/json",
			},
		});
		console.log(await user.json());
	};

	return (
		<div style={{ backgroundColor: "#f76262", width: "100%", height: "100vh" }}>
			<Banner openPartyModal={() => props.openPartyModal()} modalIsOpen={props.modalIsOpen} />
			<Modal isOpen={props.modalIsOpen} contentLabel="Minimal Modal Example">
				<PartyForm closePartyModal={() => props.closePartyModal()} />
			</Modal>
			<div style={{ display: "flex", justifyContent: "space-around" }}>
				<Suggestions />
				<div>
					<Notifications />
					<Parties />
				</div>
			</div>
			{/* <button onClick={() => getUser()}>Show user</button> */}
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

HomePage = connect(
	mapStateToProps,
	mapDispatchToProps
)(HomePage);

export default HomePage;
