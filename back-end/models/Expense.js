const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var expenseSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	budgeted: {
		type: Number,
		required: true,
	},
	actual: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
	},
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
