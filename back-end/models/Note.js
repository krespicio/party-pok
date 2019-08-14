const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var noteSchema = new Schema({
	content: {
		type: String,
		required: true,
	},
	timeAdded: {
		type: Date,
		required: true,
	},
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
