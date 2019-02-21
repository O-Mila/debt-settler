const express = require('express');
const router = express.Router();
const Group = require('../database/models/group');
const Payment = require('../database/models/payment');
const User = require('../database/models/user');

// Add new group
router.post('/new', (req, res) => {
	const { name, members } = req.body;
	const usernames = members.map(member => member.username);
	User.find({ username: usernames }, (err, users) => {
		if (err) return res.json(err);
		Group.create({ name: name, users: users }, (err, newGroup) => {
			if (err) return res.json(err);
			res.json(newGroup)
		})
	})
})

// Add group to the user objects
router.get('/new/:group_id', (req, res) => {
	Group.findById(req.params.group_id).populate('users').exec((err, group) => {
		if(err) return res.json(err);
		const usernames = group.users.map(user => user.username);
		User.find({ username: usernames }, (err, users) => {
			users.forEach((user) => {
				user.groups.push(group);
				user.save();
			})
			res.json(users)
		})
	})
})

// Show selected group
router.get('/:group_id', (req, res) => {
	const { group_id } = req.params
	Group.findById(req.params.group_id).populate('users').populate({
		path: 'payments',
		model: 'Payment',
		populate: {
			path: 'user',
			model: 'User'
		}
	}).exec((err, group) => {
		if (err) return res.json(err);
		const { payments } = group
		const users = group.users.map(user => {
			return {
				_id: user._id,
				username: user.username,
				payments: 0,
				debt: {
					amount: [],
					receiver: []
				}
			}
		})
		users.forEach(user => {
			for(let i = 0; i < payments.length; i++){
				if(user._id.equals(payments[i].user._id)){
					user.payments += payments[i].paid
					user.payments -= payments[i].received
				}
			}
		})
		const balance = users.map(user => user.payments)
		while(balance.some(item => item !== 0)){
			let greatestIndex = balance.indexOf(Math.max(...balance));
			let lowestIndex = balance.indexOf(Math.min(...balance));
			let debt = Math.min(Math.abs(balance[greatestIndex]), Math.abs(balance[lowestIndex]))
			users[lowestIndex].debt.amount.push(debt)
			users[lowestIndex].debt.receiver.push(users[greatestIndex].username)
			balance[greatestIndex] -= debt
			balance[lowestIndex] += debt
		}
		res.json({
			balance: users,
			group: group
		})
	})
});

module.exports = router