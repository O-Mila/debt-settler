const mongoose = require("mongoose");
const GroupSchema = require('./group');
const PaymentSchema = require('./payment');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
	username: String,
	password: String,
	groups: [{
	 	type: Schema.Types.ObjectId,
	 	ref: "Group"
	}],
	payments: [{
	 	type: Schema.Types.ObjectId,
	 	ref: "Payment"
	}]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);