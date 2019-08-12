const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var noteSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
