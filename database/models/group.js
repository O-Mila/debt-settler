const mongoose = require('mongoose');
const UserSchema = require('./user');
const ItemSchema = require('./item');
const PaymentSchema = require('./payment');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
	name: String,
	users: [{
		type: Schema.Types.ObjectId,
	 	ref: "User"
	}],
	items: [{
	 	type: Schema.Types.ObjectId,
	 	ref: "Item"
	}],
	payments: [{
		type: Schema.Types.ObjectId,
		ref: "Payment"
	}]
});

module.exports = mongoose.model("Group", GroupSchema);