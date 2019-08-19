const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Contact = require("../models/Contact");

router.post("/contact/create", (req, res) => {
	if (req.body) {
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

module.exports = router;
