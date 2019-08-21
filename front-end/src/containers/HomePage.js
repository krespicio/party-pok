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
	return (
		<div style={styles.home}>
			<Banner openPartyModal={() => props.openPartyModal()} modalIsOpen={props.modalIsOpen} />
			<Modal
				isOpen={props.modalIsOpen}
				contentLabel="Minimal Modal Example"
				className="modaling">
				<PartyForm closePartyModal={() => props.closePartyModal()} />
			</Modal>
			<div style={{ display: "flex", justifyContent: "space-evenly" }}>
				<Suggestions />
				<div style={styles.rightSide}>
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

const styles = {
	home: { backgroundColor: "#f76262", width: "100%", height: "100vh" },
	rightSide: { minWidth: "49%", display: "flex", flexDirection: "column" },
};

export default HomePage;
