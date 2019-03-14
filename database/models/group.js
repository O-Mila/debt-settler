const mongoose = require("mongoose");
const ItemSchema = require("./item");
const PaymentSchema = require("./payment");
const TransferSchema = require("./transfer");
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
	name: String,
	currency: String,
	members: [{
		user: {
			type: Schema.Types.ObjectId,
	 		ref: "User"
		},
		balance: Number,
		debts: 	[{
			amount: Number,
			receiver: {
				type: Schema.Types.ObjectId,
				ref: "User"
			}
		}]
	}],
	items: [{
	 	type: Schema.Types.ObjectId,
	 	ref: "Item"
	}],
	transfers: [{
		type: Schema.Types.ObjectId,
		ref: "Transfer"
	}],
	date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Group", GroupSchema);