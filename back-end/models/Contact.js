const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var contactSchema = new Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	account: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
	},
	phone: {
		type: String,
		minlength: 10,
		maxlength: 10,
		required: true,
	},
	email: {
		type: String,
	},
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
