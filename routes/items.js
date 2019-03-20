const express = require("express");
const Group = require("../database/models/group");
const User = require("../database/models/user");
const Item = require("../database/models/item");
const Payment = require("../database/models/payment");
const router = express.Router({mergeParams: true});

twoDecimals = amount => Math.round(amount*100)/100

// Create item
router.post('/', (req, res) => {
	const { name, members, group_id } = req.body;
	const total = twoDecimals(req.body.total);
	const paid = req.body.paid.map(payment => twoDecimals(payment));
	const received = req.body.received.map(consumption => twoDecimals(consumption));
	const payments = members.map(member => member.user).map((user, index) => {
		return { 
			paid: paid[index], received: received[index], user
		}
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
	}).exec().then(item => {
		Group.findById(req.params.group_id)
		.populate({ path: "members.user", model: "User" })
		.exec().then(group => {
			group.items.push(item)
			group.members.forEach(member => {
				for(let i = 0; i < group.members.length; i++){
					if(member.user._id.equals(item.payments[i].user._id)){
						member.balance = twoDecimals(member.balance + 
							item.payments[i].paid - item.payments[i].received)
					}
				}
			})
			group.save()
			res.json(group)
		}).catch(err => res.json(err))
	}).catch(err => res.json(err))
})

// Retrieve list of items
router.get('/', (req, res) => {
	Group.findById(req.params.group_id).populate('items').exec()
	.then(group => res.json(group.items))
	.catch(err => res.json(err))
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
	}).exec().then(item => {
		Group.findById(req.params.group_id)
		.then(group => {
			res.json({
				currency: group.currency,
				item: item
			})
		})
		.catch(err => res.json(err))
	}).catch(err => res.json(err))
})

module.exports = router