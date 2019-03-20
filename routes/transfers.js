const express = require("express");
const Group = require("../database/models/group");
const User = require("../database/models/user");
const Payment = require("../database/models/payment");
const Transfer = require("../database/models/transfer");
const router = express.Router({mergeParams: true});

twoDecimals = amount => Math.round(amount*100)/100

// Add new transfer
router.post('/new', (req, res) => {
	const { payer_id, receiver_id } = req.body
	const amount = twoDecimals(req.body.amount)
	const { group_id } = req.params
	User.findById(payer_id)
	.then(foundPayer => {
		User.findById(receiver_id) 
		.then(foundReceiver => {
			const date = Date.now()
			Transfer.create({
				amount: amount, 
				payer: foundPayer, 
				receiver: foundReceiver, 
				date: date
			}).then(transfer => {
				Group.findById(group_id)
				.then(group => {
					group.transfers.push(transfer)
					group.members.forEach(member => {
						if (member.user._id.equals(foundPayer._id)){
							member.balance = twoDecimals(member.balance + Number(amount))
						} else if (member.user._id.equals(foundReceiver._id)){
							member.balance = twoDecimals(member.balance - Number(amount))
						}
					})
					group.save();
					res.json(group);
				})
				.catch(err => res.json(err))
			})
			.catch(err => res.json(err))
		})
		.catch(err => res.json(err))
	})
	.catch(err => res.json(err))
})

// Retrieve list of transfers
router.get('/', (req, res) => {
	Group.findById(req.params.group_id)
	.populate({
		path: "transfers",
		model: "Transfer",
		populate: [{ path: "payer", model: "User" },
				   { path: "receiver", model: "User" }]
	}).exec().then(group => res.json(group.transfers))
	.catch(err => res.json(err))
})

module.exports = router