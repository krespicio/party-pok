const express = require("express");
const router = express.Router();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
// const fromNumber = process.env.MY_TWILIO_NUMBER;
const twilio = require("twilio");

const client = new twilio(accountSid, authToken);

const sayYes = phoneNumber => {};

const sayNo = phoneNumber => {
	const from = "+17756245417";
	const congrats = ``;

	client.messages
		.create({ body: congrats, from, to: phoneNumber })
		.then(message => {
			console.log(message);
			res.json({ success: true, msg: "User sent in a weird response" });
		})
		.catch(e => {
			console.log(e);
			res.json({
				success: false,
				msg: "There's an error with sending a message back",
			});
		});
};

const sayMaybe = phoneNumber => {};

// This route is for when you text twilio back
router.post("/invitation/text/recieve", (req, res) => {
	// If they reply to a message, then we should redirect to send them back a message
	// This is Twilio's number
	const from = "+17756245417";
	const helpBack = ``;
	switch (req.body.Body) {
		case "Yes":
			sayYes(req.body.From);
			break;
		case "No":
			sayNo(req.body.From);
			break;
		case "Maybe":
			sayMaybe(req.body.From);
			break;
		default:
			client.messages
				.create({ body: helpBack, from, to: req.body.From })
				.then(message => {
					console.log(message);
					res.json({ success: true, msg: "User sent in a weird response" });
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
	} at ${req.body.location}. Send Yes to RSVP, No to decline, and Maybe if you're undecided.`;
	const from = "+17756245417";
	client.messages
		.create({ body: invitation, from, to: req.body.to })
		.then(message => {
			console.log(message);
			res.json({ success: true, msg: "invitation was sent" });
		})
		.catch(e => {
			console.log(e);
			res.json({ success: false, msg: "invitation was NOT sent" });
		});
});

// router.get("/invitation/text/confirmation", (req, res) => {

// });

module.exports = router;
