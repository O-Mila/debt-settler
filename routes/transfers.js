const express = require('express');
const Group = require('../database/models/group');
const User = require('../database/models/user');
const Payment = require('../database/models/payment');
const router = express.Router({mergeParams: true});

// Add new transfer
router.post('/new', (req, res) => {
	const { payer, receiver, amount } = req.body
	const { group_id } = req.params
	Group.findById(req.params.group_id, (err, group) => {
		User.find({username: payer}, (err, foundPayer) => {
			if(err) res.json(err)
			Payment.create({paid: 0, received: amount, user: foundPayer[0], inItem: false}, 
				(err, payment) => {
				if(err) res.json(err)
				group.payments.push(payment)
			})
		})
		User.find({username: receiver}, (err, foundReceiver) => {
			if(err) res.json(err)
			Payment.create({paid: amount, received: 0, user: foundReceiver[0], inItem: false}, 
				(err, consumption) => {
				if(err) res.json(err)
				group.payments.push(consumption)
			})
		})
		setTimeout(() => {
			group.save()
			res.json(group)
		}, 1000)
	})
})

module.exports = router