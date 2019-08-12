const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var budgetSchema = new Schema({
	max: {
		type: Number,
		required: true,
	},
});

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
