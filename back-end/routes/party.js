const express = require("express");
const router = express.Router();

const Party = require("../models/Party");
const User = require("../models/User");

router.get("/parties/get", (req, res) => {
	try {
		if (req.user) {
			User.findOne({ _id: req.user._id })
				.populate("parties")
				.exec((err, user) => {
					if (user) {
						res.json({
							success: true,
							msg: "Loading Parties successfully",
							data: user.parties,
						});
					}
				});
		} else {
			throw "The user is not logged in currently";
		}
	} catch (e) {
		console.log(e);
		res.json({ sucess: false, msg: "Failed to load parties..." });
	}
});

router.post("/party/create", (req, res) => {
	try {
		if (req.user) {
			const newParty = new Party({
				title: req.body.title,
				description: req.body.description,
				time: req.body.time,
				location: req.body.location,
				// budget: req.body.budget,
			});
			newParty.save(err => {
				if (!err) {
					User.findOne({ _id: req.user._id }, (err2, user) => {
						user.parties.push(newParty);
						user.save(err3 => {
							if (!err3) {
								res.json({ success: true, msg: "Party successfully created!" });
							}
						});
					});
				}
			});
		}
	} catch (e) {
		console.log(e);
		res.json({ sucess: false, msg: "Failed to create party..." });
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
