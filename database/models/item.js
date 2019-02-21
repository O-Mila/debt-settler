const mongoose = require("mongoose");
const PaymentSchema = require('./payment');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
	name: String,
	payments: [{
		type: Schema.Types.ObjectId,
		ref: "Payment"		
	}]
});

module.exports = mongoose.model("Item", itemSchema);