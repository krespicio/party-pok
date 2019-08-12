const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema({
	username: {
		type: String,
		required: true,
	},

	password: {
		type: String,
		required: true,
	},
	parties: [
		{
			type: [mongoose.Schema.ObjectId],
			ref: "parties",
			default: [],
		},
	],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
