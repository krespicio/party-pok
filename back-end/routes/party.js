const express = require("express");
const router = express.Router();

const Party = require("../models/Party");
const User = require("../models/User");
const Note = require("../models/Note");
const Expense = require("../models/Expense");

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
				budget: req.body.budget,
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
			Party.findOne({ _id: req.params.partyId })
				.populate("notes")
				.exec((err, party) => {
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
		Party.findOne({ _id: req.params.partyId })
			.populate("notes")
			.exec((err, party) => {
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

router.post("/party/:partyId/notes/:noteId/delete", (req, res) => {
	try {
		Note.findOne({ _id: req.params.noteId }).remove(err => {
			if (err) {
				throw err;
			} else {
				res.json({ success: true, msg: "Successfully deleted party note" });
			}
		});
	} catch (e) {
		console.log(e);
		res.json({ sucess: false, msg: "Failed to edit party note..." });
	}
});

router.post("/party/:partyId/expenses/get", (req, res) => {
	Party.findOne({ _id: req.params.partyId })
		.populate("expenses")
		.exec((err, party) => {
			if (!err) {
				res.json({
					success: true,
					msg: "Successfully loaded expenses",
					data: party.expenses,
				});
			}
		});
});

router.get("/party/:partyId/expenses/create", (req, res) => {
	Party.findOne({ _id: req.params.partyId }, (err, party) => {
		let newExpense = new Expense({
			cost: req.body.cost,
			name: req.body.name,
		});
		newExpense.save(err2 => {
			if (!err2) {
				party.expenses.push(newExpense);
				party.save(err3 => {
					if (!err3) {
						res.json({
							success: true,
							msg: "Successfully create new expense for party",
						});
					}
				});
			}
		});
	});
});

router.post("/expenses/:expenseId/edit", (req, res) => {
	Expense.findOneAndUpdate(
		{ _id: req.params.expenseId },
		{ name: req.body.name, cost: req.body.cost },
		(err, expense) => {
			if (!err) {
				res.json({ success: true, msg: "Successfully edited party expense" });
			}
		}
	);
});

router.post("/expenses/:expenseId/delete", (req, res) => {
	try {
		Expense.findOne({ _id: req.params.noteId }).remove(err => {
			if (err) {
				throw err;
			} else {
				res.json({ success: true, msg: "Successfully deleted party expense" });
			}
		});
	} catch (e) {
		console.log(e);
		res.json({ sucess: false, msg: "Failed to delete party expense..." });
	}
});

module.exports = router;
