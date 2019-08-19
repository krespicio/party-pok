const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Contact = require("../models/Contact");
const Party = require("../models/Party");

router.post("/contact/check", (req, res) => {
	if (req.user) {
		Contact.findOne({ phone: req.body.phone }, (err, contact) => {
			if (contact) {
				if (req.user.contacts.includes(contact._id)) {
					res.json({ success: true, msg: "Logged-in user has contact" });
				} else {
					console.log("there is none", req.user.contacts, contact);
					res.json({ success: false, msg: "Logged-in user does NOT have contact" });
				}
			} else {
				res.json({ success: false, msg: "Logged-in user does NOT have contact" });
			}
		});
	}
});

router.post("/contact/create", (req, res) => {
	if (req.user) {
		const newContact = new Contact({
			phone: req.body.phone,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
		});
		// console.log("this is the req.body", req.user._id);
		newContact.save(err => {
			User.findOne({ _id: req.user._id }, (err2, user) => {
				if (!err2) {
					user.contacts.push(newContact);
					user.save(err3 => {
						res.json({ success: true, msg: "new contact was created" });
					});
				}
			});
		});
	}
});

router.get("/guests/:partyId/get", (req, res) => {
	Party.findOne({ _id: req.params.partyId })
		.populate({ path: "guests", populate: { path: "contact", model: "Contact" } })
		.exec((err, party) => {
			if (!err) {
				res.json({
					success: true,
					msg: "Successfully populated guests",
					data: party.guests,
				});
			}
		});
});

module.exports = router;
