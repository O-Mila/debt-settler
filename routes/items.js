const express = require('express');
const Group = require('../database/models/group');
const User = require('../database/models/user');
const Item = require('../database/models/item');
const Payment = require('../database/models/payment');
const router = express.Router({mergeParams: true});

// Create item
router.post('/', (req, res) => {
	const { name, paid, received, users, group_id } = req.body;
	var payments = []
	for(let i = 0; i < users.length; i++){
		Payment.create({paid: paid[i], received: received[i], user: users[i], inItem: true},
			(err, newPayment) => {
			if(err) res.json(err)
			payments.push(newPayment)
		})
	}
		
	setTimeout(() => {
		Item.create({ name: name, payments: payments }, (err, newItem) => {
			if(err) res.json(err)
			Group.findById(group_id, (err, group) => {
				if(err) res.json(err)
				group.items.push(newItem);
				payments.forEach(payment => group.payments.push(payment))
				group.save();
				res.json(newItem)
			})
		})
	}, 1000)
})

// Retrieve list of items
router.get('/', (req, res) => {
	Group.findById(req.params.group_id).populate('items').exec((err, group) => {
		if(err) res.json(err)
		res.json(group.items)
	})
})

// Show selected item
router.get('/:item_id', (req, res) => {
	Item.findById(req.params.item_id).populate({
		path: 'payments',
		model: 'Payment',
		populate: {
			path: 'user',
			model: 'User'
		}
	}).exec((err, item) => {
		if(err) res.json(err)
		res.json(item)
	})
})

module.exports = router