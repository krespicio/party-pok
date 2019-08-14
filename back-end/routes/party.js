const express = require("express");
const router = express.Router();

const Party = require("../models/Party");
const User = require("../models/User");
const Note = require("../models/Note");

router.get("/parties/get", (req, res) => {
	try {
		if (req.user) {
			User.findOne({ _id: req.user._id })
				.populate({ path: "parties", populate: { path: "notes" } })
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

router.get("/party/:partyId/get", (req, res) => {
	try {
		if (req.user) {
			Party.findOne({ _id: req.params.partyId }, (err, party) => {
				if (!err) {
					res.json({
						success: true,
						msg: "Successfully loaded party information",
						data: party,
					});
				}
			});
		}
	} catch (e) {
		console.log(e);
		res.json({ sucess: false, msg: "Failed to load party..." });
	}
});

router.post("/party/:partyId/edit", (req, res) => {
	// try{
	// } catch(e) {
	// 	console.log(e)
	// 	res.json({ sucess: false, msg: "Failed to load party..." });
	// }
});

router.post("/party/:partyId/notes/create", (req, res) => {
	console.log("notes should be added in route");
	try {
		Party.findOne({ _id: req.params.partyId }, (err, party) => {
			let newNote = new Note({
				content: req.body.content,
				timeAdded: req.body.timeAdded,
			});
			newNote.save(err2 => {
				if (err2) {
					throw err2;
				}
				party.notes.push(newNote);
				party.save(err3 => {
					if (!err3) {
						res.json({
							success: true,
							msg: "Successfully created note for specified party",
						});
					}
				});
			});
		});
	} catch (e) {
		console.log(e);
		res.json({ sucess: false, msg: "Failed to create note..." });
	}
});

router.get("/party/:partyId/notes/get", (req, res) => {
	try {
		Party.findOne({ _id: req.params.partyId }, (err, party) => {
			if (party) {
				res.json({
					success: true,
					msg: "Successfully loaded party notes",
					data: party.notes,
				});
			}
		});
	} catch (e) {
		console.log(e);
		res.json({ sucess: false, msg: "Failed to load party notes..." });
	}
});

router.post("/party/:partyId/notes/:noteId/edit", (req, res) => {
	try {
		Note.findOne({ _id: req.params.noteId }, (err, note) => {
			if (note) {
				note.content = req.body.content;
				note.save(err2 => {
					if (!err2) {
						res.json({ success: true, msg: "Note was successfully edited" });
					}
				});
			}
		});
	} catch (e) {
		console.log(e);
		res.json({ sucess: false, msg: "Failed to edit party note..." });
	}
});

router.post("/party/:partyId/budget/get", (req, res) => {
	// try{
	// } catch(e) {
	// 	console.log(e)
	// 	res.json({ sucess: false, msg: "Failed to load party budget..." });
	// }
});

router.get("/party/:partyId/budget/edit", (req, res) => {
	// try{
	// } catch(e) {
	// 	console.log(e)
	// 	res.json({ sucess: false, msg: "Failed to edit party budget..." });
	// }
});

module.exports = router;
