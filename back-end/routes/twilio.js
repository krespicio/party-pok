const express = require("express");
const router = express.Router();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
// const fromNumber = process.env.MY_TWILIO_NUMBER;
const twilio = require("twilio");

const client = new twilio(accountSid, authToken);

// This route is for when you text twilio back
router.post("/invitation/text/recieve", (req, res) => {
	// If they reply to a message, then we should redirect to send them back a message
	switch (req.body.Body) {
		case "Yes":
			break;
		case "No":
			break;
		case "Maybe":
			break;
		default:
			break;
	}

	console.log("text recieved", req.body);
	client.messages
		.create({ body: "Hi there!", from: req.body.To, to: req.body.From })
		.then(message => console.log(message));
	res.json({ success: true, msg: "Text back recieved" });
});

router.get("invitation/text/send", (req, res) => {
	const invitation = `Hello, you are invited to attend ${""}'s party on ${""} at ${""}`;

	client.messages
		.create({ body: invitation, from: req.body.To, to: req.body.From })
		.then(message => console.log(message));
});

module.exports = router;
