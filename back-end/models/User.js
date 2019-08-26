const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const findOrCreate = require("mongoose-findorcreate");

var userSchema = new Schema({
	username: {
		type: String,
		required: true,
	},

	password: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	parties: [
		{
			type: [mongoose.Schema.ObjectId],
			ref: "Party",
			default: [],
		},
	],
	contacts: [
		{
			type: [mongoose.Schema.ObjectId],
			ref: "Party",
			default: [],
		},
	],
});

//This gives the find or create method
userSchema.plugin(findOrCreate);
const User = mongoose.model("User", userSchema);

module.exports = User;
