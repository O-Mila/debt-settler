const mongoose = require("mongoose");
const ItemSchema = require('./item');
const GroupSchema = require('./group');
const UserSchema = require('./user');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
	paid: Number,
	received: Number,
	user: {
		type: Schema.Types.ObjectId,
	 	ref: "User"
	},
	inItem: Boolean
});

module.exports = mongoose.model("Payment", paymentSchema);