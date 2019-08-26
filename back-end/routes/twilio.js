const express = require("express");
const router = express.Router();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
// const fromNumber = process.env.MY_TWILIO_NUMBER;
const twilio = require("twilio");

const client = new twilio(accountSid, authToken);

const Guest = require("../models/Guest");
const Contact = require("../models/Contact");
const Party = require("../models/Party");

const sayYes = (phoneNumber, res) => {
	const from = "+17756245417";
	const congrats = `Congrats! We'll see you at the party :)`;
	const originalNumber = phoneNumber
		.split("")
		.slice(2)
		.join("");
	Contact.findOne({ phone: originalNumber }, (err, contact) => {
		// In the future, this should be a find because someone could be invited
		// to multiple parties
		Guest.findOne({ contact: contact.id }, (err2, guest) => {
			console.log(guest);
			if (guest) {
				guest.status = "Going";
				guest.save(err2 => {
					if (!err2) {
						client.messages
							.create({ body: congrats, from, to: phoneNumber })
							.then(message => {
								console.log("here is the message", message);
								res.status(200).json({ success: true, msg: "User sent in a yes" });
							})
							.catch(e => {
								console.log("there was an error", e);
								res.json({
									success: false,
									msg: "There's an error with sending a message back",
								});
							});
					} else {
						console.log(err2);
					}
				});
			}
		});
	});
};

const sayNo = (phoneNumber, res) => {
	const from = "+17756245417";
	const congrats = `That's alright, hope we see you at the next party`;
	const originalNumber = phoneNumber
		.split("")
		.slice(2)
		.join("");
	Contact.findOne({ phone: originalNumber }, (err, contact) => {
		// In the future, this should be a find because someone could be invited
		// to multiple parties
		Guest.findOne({ contact: contact.id }, (err2, guest) => {
			console.log(guest);
			if (guest) {
				guest.status = "Unable";
				guest.save(err2 => {
					client.messages
						.create({ body: congrats, from, to: phoneNumber })
						.then(message => {
							console.log("here is the message", message);
							res.status(200).json({ success: true, msg: "User sent in a mp" });
						})
						.catch(e => {
							console.log("there was an error", e);
							res.json({
								success: false,
								msg: "There's an error with sending a message back",
							});
						});
				});
			}
		});
	});
};

// This route is for when you text twilio back
router.post("/invitation/text/recieve", (req, res) => {
	// This is Twilio's number
	const from = "+17756245417";
	const helpBack = `Send No to reject the party. Send Yes to accept the invitation`;

	const text = req.body.Body.toLowerCase();
	console.log(text);
	switch (text) {
		case "yes":
			sayYes(req.body.From, res);
			break;
		case "no":
			console.log("here is a no");
			sayNo(req.body.From, res);
			break;
		default:
			client.messages
				.create({ body: helpBack, from, to: req.body.From })
				.then(message => {
					console.log(message);
					res.status(200).json({ success: true, msg: "User sent in a weird response" });
				})
				.catch(e => {
					console.log(e);
					res.json({
						success: false,
						msg: "There's an error with sending a message back",
					});
				});
			break;
	}
});

router.post("/invitation/text/send", (req, res) => {
	const invitation = `Hey there! You are invited to attend ${req.user.firstName}'s party on ${
		req.body.time
	} at ${req.body.location}. Send Yes to RSVP or No to decline.`;
	const from = "+17756245417";

	// Change the phone number to be searched
	const originalNumber = req.body.to
		.split("")
		.slice(2)
		.join("");
	console.log(originalNumber);

	// Guest({phone: originalNumber}, (err, guest) => {
	//     if(!guest){

	//     }
	// })

	Contact.findOne({ phone: originalNumber }, (err, contact) => {
		if (contact) {
			let newGuest = new Guest({
				contact,
				status: "Undecided",
			});
			newGuest.save(err2 => {
				if (!err2) {
					Party.findOne({ _id: req.body.id }, (err3, party) => {
						if (party) {
							party.guests.push(newGuest);
							party.save(err4 => {
								client.messages
									.create({ body: invitation, from, to: req.body.to })
									.then(message => {
										console.log(message);
										res.json({ success: true, msg: "invitation was sent" });
									})
									.catch(e => {
										console.log(e);
										res.json({
											success: false,
											msg: "invitation was NOT sent",
										});
									});
							});
						}
					});
				}
			});
		}
	});
});

// router.get("/invitation/text/confirmation", (req, res) => {

// });

module.exports = router;
