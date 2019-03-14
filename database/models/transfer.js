const mongoose = require("mongoose");
const ItemSchema = require('./item');
const GroupSchema = require('./group');
const UserSchema = require('./user');
const Schema = mongoose.Schema;

const transferSchema = new Schema({
	amount: Number,
	payer: {
		type: Schema.Types.ObjectId,
	 	ref: "User"
	},
	receiver: {
		type: Schema.Types.ObjectId,
	 	ref: "User"
	},
	date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transfer", transferSchema);