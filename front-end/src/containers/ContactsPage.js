import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Redirect } from "react-router-dom";
import Modal from "react-modal";
import { connect } from "react-redux";
import { openPartyModal, closePartyModal } from "../actions/index";

import Banner from "../components/Banner";
import PartyForm from "../components/PartyForm";

Modal.setAppElement("#root");

let ContactsPage = props => {
	return (
		<div>
			<Banner openPartyModal={() => props.openPartyModal()} modalIsOpen={props.modalIsOpen} />
			<Modal isOpen={props.modalIsOpen} contentLabel="Minimal Modal Example">
				<PartyForm closePartyModal={() => props.closePartyModal()} />
			</Modal>
			<div style={{ display: "flex", justifyContent: "space-around" }}>Contacts</div>
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

ContactsPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(ContactsPage);

export default ContactsPage;
