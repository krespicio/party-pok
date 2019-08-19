const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var guestSchema = new Schema({
	contact: {
		type: mongoose.Schema.ObjectId,
		required: true,
	},
	status: {
		type: String,
		enum: ["Going", "Unable", "Undecided"],
	},
});

const Guest = mongoose.model("Guest", guestSchema);

module.exports = Guest;
