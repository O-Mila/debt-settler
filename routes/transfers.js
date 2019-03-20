const express = require("express"),
Group 		  = require("../database/models/group"),
User  		  = require("../database/models/user"),
Payment       = require("../database/models/payment"),
Transfer 	  = require("../database/models/transfer"),
router 		  = express.Router({mergeParams: true}),
methods 	  = require("../methods.js");

const { findGroup, twoDecimals } = methods;

// Add new transfer
router.post('/new', (req, res) => {
	const { payer_id, receiver_id } = req.body
	const amount = twoDecimals(req.body.amount)
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
				findGroup(req.params.group_id)
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
	findGroup(req.params.group_id).then(group => res.json(group.transfers))
	.catch(err => res.json(err))
})

module.exports = router