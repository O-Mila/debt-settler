const express = require("express"),
Group 		  = require("../database/models/group"),
User 		  = require("../database/models/user"),
Item 		  = require("../database/models/item"),
Payment 	  = require("../database/models/payment"),
router 		  = express.Router({mergeParams: true}),
methods 	  = require("../methods.js");

const { findGroup, findItem, twoDecimals } = methods;

// Create item
router.post("/", (req, res) => {
	const { name, members, group_id } = req.body;
	findGroup(group_id).then(group => {
		const itemExists = group.items.some(item => item.name === name)
		if(itemExists) res.send("There is an expense with this name already!");
		else {
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
		}
	})
	.catch(err => res.json(err))
})

// Add item to group object
router.post("/new", (req, res) => {
	const { item_id } = req.body
	const { group_id } = req.params
	findItem(item_id).then(item => {
		findGroup(group_id)
		.then(group => {
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
router.get("/", (req, res) => {
	findGroup(req.params.group_id)
	.then(group => res.json(group.items))
	.catch(err => res.json(err))
})

// Show selected item
router.get("/:item_id", (req, res) => {
	const { group_id, item_id } = req.params
	findItem(item_id).then(item => {
		findGroup(group_id)
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