const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var partySchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	time: {
		type: Date,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	budget: {
		type: mongoose.Schema.ObjectId,
		ref: "Budget",
	},
	notes: [
		{
			type: mongoose.Schema.ObjectId,
			ref: "Note",
		},
	],
});

const Party = mongoose.model("Party", partySchema);

module.exports = Party;
