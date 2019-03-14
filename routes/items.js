const express = require("express");
const Group = require("../database/models/group");
const User = require("../database/models/user");
const Item = require("../database/models/item");
const Payment = require("../database/models/payment");
const router = express.Router({mergeParams: true});

// Create item
router.post('/', (req, res) => {
	const { name, paid, received, members, group_id } = req.body;
	const payments = members.map(member => member.user).map((user, index) => {
		return { paid: paid[index], received: received[index], user }
	})
	const date = Date.now()
	Payment.insertMany(payments)
	.then(newPayments => Item.create({ name: name, payments: newPayments, date: date }))
	.then(newItem => res.json(newItem))
	.catch(err => res.json(err))
})

// Add item to group object
router.post('/new', (req, res) => {
	const { item_id } = req.body
	Item.findById(item_id).populate({
		path: "payments", model: "Payment", 
		populate: { path: "user", model: "User" }
	}).exec((err, item) => {
		if(err) res.json(err)
		console.log('Item', item)
		Group.findById(req.params.group_id)
		.populate({ path: "members.user", model: "User" })
		.exec((err, group) => {
			if(err) res.json(err)
			group.items.push(item)
			group.members.forEach(member => {
				for(let i = 0; i < group.members.length; i++){
					if(member.user._id.equals(item.payments[i].user._id)){
						member.balance += item.payments[i].paid - item.payments[i].received
					}
				}
			})
			group.save()
			res.json(group)
		})
	})
})

// Retrieve list of items
router.get('/', (req, res) => {
	console.log('Item req.params', req.params)
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
		Group.findById(req.params.group_id)
		.then(group => {
			res.json({
				currency: group.currency,
				item: item
			})
		})
		.catch(err => console.log(err))
	})
})

module.exports = router