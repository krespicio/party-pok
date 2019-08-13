const express = require("express");
const router = express.Router();

const Party = require("../models/Party");

router.post("/party/create", (req, res) => {
	try {
		const newParty = new Party({
			title: req.body.title,
			description: req.body.description,
			time: req.body.time,
			location: req.body.location,
			budget: req.body.budget,
		});
		newParty.save(err => {
			if (!err) {
				res.json({ sucess: true, msg: "Party successfully created!" });
			}
		});
	} catch (e) {
		res.json({ sucess: false, msg: "Failed to create party..." });
		console.log(e);
	}
});

router.post("/party/:partyId/get", (req, res) => {});

router.post("/party/:partyId/edit", (req, res) => {});

router.get("/party/:partyId/get", (req, res) => {});

router.get("/party/:partyId/notes/create", (req, res) => {});

router.get("/party/:partyId/notes/get", (req, res) => {});

router.get("/party/:partyId/notes/:noteId/edit", (req, res) => {});

router.get("/party/:partyId/budget/get", (req, res) => {});

router.get("/party/:partyId/budget/edit", (req, res) => {});

module.exports = router;
